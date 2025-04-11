const {ResponseEntity} = require("./response");

/**
 * Throws 400 error to client
 */
class BadRequestError extends Error {
  constructor(message = "Bad request") {
    super(message);
    this.name = 'BadRequestError';
  }
}

/**
 * Throws 401 error to client
 */
class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

/**
 * Throws 403 error to client
 */
class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = 'ForbiddenError';
  }
}

/**
 * Throws 404 error to client
 */
class NotFoundError extends Error {
  constructor(message = "Entity not found") {
    super(message);
    this.name = 'NotFoundError';
  }
}

module.exports = {
  errorHandler: (err, req, res, next) => {
    let status = 500;

    if (err.name === "BadRequestError") {
      status = 400;
    } else if (err.name === "UnauthorizedError" || err.name === "JsonWebTokenError") {
      status = 401;
    } else if (err.name === "ForbiddenError") {
      status = 403;
    } else if (err.name === "NotFoundError") {
      status = 404;
    } else {
      console.error(err);
    }

    res.status(status).json(new ResponseEntity(null, status, err.message));
  },
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  BadRequestError
}
