import { Request, Response, NextFunction } from 'express';


/**
 * Send response to client in proper format
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const responseFormatHandler = async (req:Request, res:Response, next:NextFunction) => {
  if (res.locals.responseData) {
    res.status(200).json(res.locals.responseData);
  }
};
