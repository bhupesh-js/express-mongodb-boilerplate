import { v4 as uuid } from 'uuid';
import { Response, NextFunction, Request } from 'express';
import { Context } from '../helpers/context';

/**
 * Create a unique request id and sets in the context
 *
 * @param {IRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const contextHandler = async (req:Request, res:Response, next:NextFunction) => {
  const requestId = uuid();
  Context.setRequestId(req, res, requestId);
  next();
};
