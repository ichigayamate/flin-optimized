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