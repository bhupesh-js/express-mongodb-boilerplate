import ApplicationError from './applicationError';


/**
 * @param {string} message
 * @returns {ApplicationError with status code 400 }
 */
function InvalidRequest(message:string): ApplicationError {
  return new ApplicationError(message, 400);
}

/**
 *
 *
 * @param {string} message
 * @returns {ApplicationError with status code 404}
 */
function NotFound(message:string): ApplicationError {
  return new ApplicationError(message, 404);
}
/**
 *
 *
 * @param {string} message
 * @returns {ApplicationError with status code 400 }
 */
function ValidationError(message:string): ApplicationError {
  return new ApplicationError(message, 400);
}
/**
 *
 *
 * @param {ApplicationError} error
 * @returns {Error status number}
 */
function isHandled(error:ApplicationError): number {
  return error.status;
}
/**
 *
 *
 * @param {string} message
 * @returns {ApplicationError with status code 401 }
 */
function Unauthorized(message:string): ApplicationError {
  return new ApplicationError(message, 401);
}

export {
  InvalidRequest, NotFound, ValidationError, isHandled, Unauthorized
};
