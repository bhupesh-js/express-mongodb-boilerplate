import {
  RequestHandler, Request, Response, NextFunction
} from 'express';
import Joi from '@hapi/joi';
import { ValidationError } from '../helpers/error/httpResponseErrors';
import { Logger } from '../helpers/logger';

/**
   * Get error message from Joi
   *
   * @param {Joi.ValidationError} error
   * @returns {(string | undefined)} Error from Joi validation
   */
const getMessageFromJoiError = (error: Joi.ValidationError): string | undefined => {
  if (!error.details && error.message) {
    return error.message;
  }
  return error.details && error.details.length > 0 && error.details[0].message
    ? `PATH: [${error.details[0].path}] ;; MESSAGE: ${error.details[0].message}` : undefined;
};

  interface HandlerOptions {
    validation?: {
      body?: Joi.ObjectSchema
    }
  };

/**
   * This router wrapper catches any error from async await
   * and throws it to the default express error handler,
   * instead of crashing the app
   * @param handler Request handler to check for error
   */
export const requestValidator = (
  handler: RequestHandler,
  options?: HandlerOptions,
): RequestHandler => async (req: Request, res: Response, next: NextFunction) => {
  const log = new Logger(__filename);
  if (options?.validation?.body) {
    const { error } = options?.validation?.body.validate(req.body);
    if (error != null) {
      return next(ValidationError(getMessageFromJoiError(error)));
    }
  }

  return handler(req, res, next).catch((err: Error) => {
    if (process.env.NODE_ENV === 'development') {
      log.error('Error in request handler');
    }
    next(err);
  });
};

export default requestValidator;
