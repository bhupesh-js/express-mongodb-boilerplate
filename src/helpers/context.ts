import * as httpContext from 'express-http-context';
import { Request, Response } from 'express';

enum CONTEXT_VALUES {
    REQUEST_ID = 'request-id',
  }

export class Context {
  public static setRequestId(req: Request, res: Response, requestId: string): void {
    httpContext.ns.bindEmitter(req);
    httpContext.ns.bindEmitter(res);
    httpContext.set(CONTEXT_VALUES.REQUEST_ID, requestId);
  }

  /**
     *
     * @static
     * @returns requestId which is present in http context
     * @memberof Context
     */
  public static getRequestId():string {
    return httpContext.get(CONTEXT_VALUES.REQUEST_ID);
  }
}
