import MyLogger from "../loggers/mylogger.log";
import { logger } from "../loggers/winston.log";

const StatusCode = {
  FORBIDDEN: 403,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  ERROR: 400,
};

const ReasonStatusCode = {
  FORBIDDEN: "Bad request error",
  CONFLICT: "conflict error",
  UNAUTHORIZED: "unauthorized",
  NOT_FOUND: "not found",
  ERROR: "error",
};

class ErrorResponse extends Error {
  status: any;
  now: any;

  constructor(message, status) {
    super(message);
    this.status = status;
    this.now = Date.now();
    //Log the error use winston
    // logger.error(`${this.status} - ${this.message}`);

    const logger = new MyLogger();
    // logger.error(this.message, { context: "/path", requestId: "aa", message: this.message, metadata: {} });

    // logger.log(this.message, ["api/vi/login", "vv2342423", { error: "BAD REQUEST ERROR" }]);
    // logger.log(this.message, ["api/vi/login", "vv2342423", { error: "BAD REQUEST ERROR" }]);
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(message, statusCode) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.FORBIDDEN) {
    super(message, statusCode);
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(message = ReasonStatusCode.UNAUTHORIZED, statusCode = StatusCode.UNAUTHORIZED) {
    super(message, statusCode);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message = ReasonStatusCode.NOT_FOUND, statusCode = StatusCode.NOT_FOUND) {
    super(message, statusCode);
  }
}

class Forbidden extends ErrorResponse {
  constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
    super(message, statusCode);
  }
}

class ErrorResponseCustom extends ErrorResponse {
  constructor(message = ReasonStatusCode.ERROR, statusCode = StatusCode.ERROR) {
    super(message, statusCode);
  }
}

export { ConflictRequestError, BadRequestError, AuthFailureError, NotFoundError, Forbidden, ErrorResponseCustom };
