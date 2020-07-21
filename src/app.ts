import bodyParser from 'body-parser';
import path from 'path';
import i18n from 'i18n';
import express, { Request, Response, NextFunction } from 'express';

import { WWW_PORT } from './helpers/config';
import ApplicationError from './helpers/error/applicationError';
import logger from './helpers/logger';
import { NotFound, isHandled } from './helpers/error/httpResponseErrors';

const app = express();


// set up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// init i18n
i18n.configure({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  directory: path.join(__dirname, 'locales'),
  objectNotation: true
});

app.set('port', WWW_PORT || 3000);

// set up headers
app.use((req:Request, res: Response, next: NextFunction) => {
  // website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  // request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 417600000 }));

// set up i18n
app.use(i18n.init);


// not found handler
app.use((req, res, next) => {
  next(NotFound(req.__('DEFAULT_ERRORS.NOT_FOUND')));
});

// error handler for handled error
app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  if (isHandled(err)) {
    // handled error
    res.status(err.status);
    const obj = {
      error: err.message
    };
    res.send(obj);
  } else {
    // un-handled error
    res.status(500);
    res.send({
      error: res.__('DEFAULT_ERRORS.SERVER_ERROR'),
      error_code: 'server_error'
    });
  }
});


export default app;
