terraform {
  required_providers {
    aws = {
      version = "= 5.94.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "= 3.1.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-3"
}