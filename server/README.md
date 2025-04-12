# Server

## Response structure

All response from this server will be on this format:

```json
{
  "status": "HTTP code in number",
  "message": "Success, or error message if the request failed.",
  "data": "Data returned from server. If the request is failed, the data will be null instead"
}
```

## Endpoints

Any endpoints marked with 🔐 means that it requires authentication. To use authentication, pass the token from login in the `Authorization` header using Bearer authorization:
```
Authorization: Bearer xxxx
```

### POST /api/chat

Usage: Request for the chatbot

**Request**

Body:

```json
{
  "message": "Any message in string. Required"
}
```

**Response**

1. If message is present in body:

```json
{
  "status": 200,
  "message": "Success",
  "data": "Hello (Any message returned from the server)"
}
```

2. If message is absent in the body or message is an empty string:

```json
{
  "status": 400,
  "message": "Message is required",
  "data": null
}
```

### POST /api/register

Usage: Register a new user

**Body**:

```json
{
  "name": "string",
  "email": "string",
  "password": "string, minimum 8 characters"
}
```

**Response**:

1. If all fields are present in the body:

```json
{
  "status": 201,
  "message": "User created successfully",
  "data": {
    "name": "string",
    "email": "string",
    "_id": "ObjectId",
    "createdAt": "Date"
  }
}
```

2. If all fields are present in the body but password is less than 8 characters:

```json
{
  "status": 400,
  "message": {
    "password": "Password must be at least 8 characters"
  },
  "data": null
}
```

3. If any field is absent in the body or any field is an empty string:

(For example: password field is missing)

```json
{
  "status": 400,
  "message": {
    "password": "Path `password` is required."
  },
  "data": null
}
```

### POST /api/login

Usage: Login a user

**Body**:

```json
{
  "email": "string",
  "password": "string"
}
```

**Response**:

1. It returns a token if the user is logged in successfully:

```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "token": "token"
  }
}
```

2. If the user is not found or password is incorrect:

```json
{
  "status": 401,
  "message": "Invalid email or password",
  "data": null
}
```

3. If any of the fields are missing:

```json
{
  "status": 400,
  "message": "Email is required (or \"password is required\")",
  "data": null
}
```

### 🔐 GET /api/profile
Usage: Get the profile of the logged in user

**Body**: None

**Response**:
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "_id": "ObjectId",
    "name": "string",
    "email": "string",
    "createdAt": "Date"
  }
}
```

### 🔐 GET /api/leads

Usage: Get all leads from the server

**Body**: None

**Response**:

```json
{
  "status": 200,
  "message": "Success",
  "data": [
    {
      "_id": "ObjectId",
      "name": "string",
      "phoneNumber": "string",
      "email": "string",
      "loanType": "string",
      "createdAt": "Date"
    }
  ]
}
```

### POST /api/leads

Usage: Stores users inquiries in the database

**Body**:

```json
{
  "name": "string",
  "phoneNumber": "string",
  "email": "string",
  "loanType": "string"
}
```

**Response**:

1. If all fields are present in the body:

```json
{
  "status": 201,
  "message": "Leads created successfully",
  "data": {
    "_id": "ObjectId",
    "name": "string",
    "phoneNumber": "string",
    "email": "string",
    "loanType": "string",
    "createdAt": "Date"
  }
}
```

2. If any field is absent in the body or any field is an empty string:

(For example: name and phoneNumber are absent in the body)

```json
{
  "status": 400,
  "message": {
    "name": "Path `name` is required.",
    "phoneNumber": "Path `phoneNumber` is required."
  },
  "data": null
}
```

### General Errors

#### Accessing a protected route (🔐) without authentication

```json
{
  "status": 401,
  "message": "Invalid token",
  "data": null
}
```
