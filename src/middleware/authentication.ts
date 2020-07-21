import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { ACCOUNT_JWT_KEY } from '../helpers/config';
import { Unauthorized } from '../helpers/error/httpResponseErrors';
import { IRequest } from '../common/types';


/**
 * Authenticate each one of the user requests
 *
 * @param {IRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns Error if the token is not valid or not specified in the request header
 */
// eslint-disable-next-line consistent-return
export const authenticationHandler = async (req:IRequest, res:Response, next:NextFunction) => {
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, ACCOUNT_JWT_KEY);
    if (decodedToken) {
      req.userId = (<any>decodedToken).userId;
      next();
    } else {
      return Unauthorized(req.__('AUTH_ERRORS.INVALID_TOKEN'));
    }
  } else {
    return Unauthorized(req.__('AUTH_ERRORS.REQUIRED_TOKEN'));
  }
};
