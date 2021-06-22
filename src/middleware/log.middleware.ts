import morgan from 'morgan';
import { Response, NextFunction, Request } from 'express';
import { Logger } from '../helpers/logger';

/**
 * Append morgan in every request
 * @param {IRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const LogHandler = async (req:Request, res:Response, next:NextFunction) => {
  const logger = new Logger();
  return morgan(process.env.LOG_OUTPUT, {
    stream: {
      write: logger.info.bind(logger)
    }
  })(req, res, next);
};
