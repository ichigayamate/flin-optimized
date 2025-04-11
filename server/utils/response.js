class ResponseEntity {
  constructor(data, status = 200, message = "Success") {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

function generateResponse(res, data, status = 200, message = "Success") {
  const responseEntity = new ResponseEntity(data, status, message);
  res.status(status).json(responseEntity);
}

module.exports = {
  ResponseEntity,
  generateResponse
};
