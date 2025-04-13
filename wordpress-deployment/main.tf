resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

# Part 1: S3 and CloudFront
# Setup CloudFront (CDN) for WordPress static media
resource "aws_cloudfront_distribution" "wordpress_cdn" {
  tags    = {
    Name = "wordpress-cdn"
  }
  enabled = true

  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods = [
      "GET",
      "HEAD",
    ]
    cached_methods = [
      "GET",
      "HEAD",
    ]
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    target_origin_id = "S3Origin"
  }

  ordered_cache_behavior {
    target_origin_id = "S3Origin"
    path_pattern     = "/wp-content/uploads/*"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods = [
      "GET",
      "HEAD",
    ]
    cached_methods = [
      "GET",
      "HEAD",
    ]
  }

  origin {
    origin_id   = "S3Origin"
    domain_name = aws_s3_bucket.wordpress_media.bucket_regional_domain_name
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.wordpress_s3_oai.cloudfront_access_identity_path
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

# Setup S3 bucket for WordPress static media
resource "aws_s3_bucket" "wordpress_media" {
  tags   = {
    Name = "wordpress-media"
  }
  bucket = "wordpress-static-media-${random_string.bucket_suffix.result}" # it should be unique
}

# Adds OAI to S3 bucket policy
resource "aws_cloudfront_origin_access_identity" "wordpress_s3_oai" {
  comment = "OAI for WordPress S3 bucket"
}

# Adds S3 Bucket Policy to allow CloudFront to access S3 bucket
resource "aws_s3_bucket_policy" "wordpress_s3_bucket_policy" {
  policy = data.aws_iam_policy_document.s3_bucket_policy.json
  bucket = aws_s3_bucket.wordpress_media.bucket
}

# IAM policy document for wordpress_s3_bucket_policy
data "aws_iam_policy_document" "wordpress_s3_bucket_policy" {
  statement {
    actions = [
      "s3:GetObject",
    ]
    principals {
      type = "AWS"
      identifiers = [
        aws_cloudfront_origin_access_identity.wordpress_s3_oai.arn,
      ]
    }
    resources = [
      "${aws_s3_bucket.wordpress_media.arn}/*",
    ]
  }
}

# Part 2: Security Groups
# Security group for WordPress EC2 instance
resource "aws_security_group" "wordpress_sg" {
  provider = aws.ap-southeast-3

  tags        = {
    Name : "wordpress-sg"
  }
  name        = "wordpress-sg"
  description = "Allows web and SSH traffic from public"

  egress {
    to_port   = 0
    protocol  = "-1"
    from_port = 0
    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }

  ingress {
    to_port     = 80
    protocol    = "tcp"
    from_port   = 80
    description = "HTTP"
    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }
  ingress {
    to_port     = 22
    protocol    = "tcp"
    from_port   = 22
    description = "SSH"
    cidr_blocks = [
      "180.0.23.1/32", # Change this to your Public IP address
    ]
  }
}

# Security group for RDS instance
resource "aws_security_group" "wp_rds_sg" {
  provider = aws.ap-southeast-3

  tags        = { Name : "wp-rds-sg" }
  name        = "wordpress-rds-sg"
  description = "WordPress RDS Security Group: Allows PORT 3306 from wordpress_instance"

  egress {
    to_port   = 65535
    protocol  = "tcp"
    from_port = 0
    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }

  ingress {
    to_port   = 3306
    protocol  = "tcp"
    from_port = 3306
    security_groups = [
      aws_security_group.wordpress_sg.id,
    ]
  }
}

# Part 3: EC2 and RDS
# RDS instance for WordPress

resource "aws_db_instance" "wordpress_db" {
  provider = aws.ap-southeast-3

  username          = var.db_username
  tags              = {
    Name = "wordpress-db"
  }
  password          = var.db_password
  instance_class    = "db.t3.micro"
  engine_version    = "8.0"
  engine            = "mysql"
  allocated_storage = 20

  vpc_security_group_ids = [
    aws_security_group.wp_rds_sg.id,
  ]
}

# EC2 instance for WordPress

resource "aws_instance" "wordpress_instance" {
  provider = aws.ap-southeast-3

  user_data     = <<-EOF
                  #!/bin/bash
                  yum update -y
                  amazon-linux-extras install php7.4 -y
                  yum install -y httpd mariadb
                  systemctl enable httpd
                  systemctl start httpd
                  cd /var/www/html
                  wget https://wordpress.org/latest.tar.gz
                  tar -xzf latest.tar.gz --strip-components=1

                  amazon-linux-extras install epel -y
                  yum install -y python3-pip
                  pip3 install awscli

                  yum install -y s3fs

                  CLOUDFRONT_DOMAIN="${aws_cloudfront_distribution.wordpress_cdn.domain_name}"
                  DB_HOST="${aws_db_instance.wordpress_db.endpoint}"
                  DB_USER="${var.db_username}"
                  DB_PASSWORD="${var.db_password}"
                  DB_NAME="wordpress"

                  cat <<EOT >> wp-config.php
                  <?php
                  define( 'DB_NAME', '$DB_NAME' );
                  define( 'DB_USER', '$DB_USER' );
                  define( 'DB_PASSWORD', '$DB_PASSWORD' );
                  define( 'DB_HOST', '$DB_HOST' );
                  define('WP_CONTENT_URL', 'https://$CLOUDFRONT_DOMAIN/wp-content');
                  ?>
                  EOT

                  mkdir /var/www/html/wp-content/uploads
                  s3fs wordpress-static-media-${random_string.bucket_suffix.result} /var/www/html/wp-content/uploads -o allow_other

                  EOF

  tags          = { Name = "wordpress-instance" }
  instance_type = "t2.micro"
  ami           = "ami-0c55b159cbfafe1f0" # Using Amazon Linux 2 AMI
  key_name      = var.key_name
  iam_instance_profile = aws_iam_instance_profile.iam_s3_access.name

  security_groups = [
    aws_security_group.wordpress_sg.id,
  ]

  vpc_security_group_ids = [
    aws_security_group.wordpress_sg.id,
  ]
}

resource "aws_iam_policy" "wp_s3_access_policy" {
  tags   = {
    Name = "wp-s3-access-policy"
  }
  policy = jsonencode({Statement = [
    {
      Action = [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket",
      ],
      Effect = "Allow",
      Resource = [
        "${aws_s3_bucket.wordpress_media.arn}",
        "${aws_s3_bucket.wordpress_media.arn}/*",
      ],
    },
  ]})
}

resource "aws_iam_role_policy_attachment" "wp_s3_access_attachment" {
  role       = aws_iam_role.wp_s3_ec2_access_role.name
  policy_arn = aws_iam_policy.wp_s3_access_policy.arn
}

resource "aws_iam_role" "wp_s3_ec2_access_role" {
  tags = {
    Name = "wp-s3-ec2-access-role"
  }
  name = "wp-s3-ec2-access-role-${random_string.bucket_suffix.result}"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_instance_profile" "iam_s3_access" {
  tags = {
    Name = "wp-s3-ec2-access-profile"
  }
  role = aws_iam_role.wp_s3_ec2_access_role.name
}
