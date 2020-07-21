import { Request } from 'express';

/**
 *
 * @export
 * @interface IRequest
 * @extends {Request}
 */
export interface IRequest extends Request
{
  userId:string
}
