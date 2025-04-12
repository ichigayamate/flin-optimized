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

Any endpoints marked with 🔐 means that it requires authentication. 

### POST /api/chat

**Usage**: Request for the chatbot

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
      "phoneNumber": "number",
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
  "phoneNumber": "number",
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
    "phoneNumber": "number",
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