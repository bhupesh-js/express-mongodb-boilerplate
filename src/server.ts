/* eslint-disable import/first */
import * as dotenv from 'dotenv';

let path;
switch (process.env.NODE_ENV) {
  case 'testing':
    path = 'config/.env.test';
    break;
  case 'production':
    path = 'config/.env.production';
    break;
  default:
    path = 'config/.env.development';
}
dotenv.config({ path });

import app from './app';
import MongoConnection from './database/mongoConnection';
import logger from './helpers/logger';
import { WWW_PORT, MONGODB_URL } from './helpers/config';

logger.info(`www - init node environment - ${process.env.NODE_ENV}`);

// create MONGO DB connection
const mongoConnection = new MongoConnection(MONGODB_URL);

// Connect to Mongo DN if url is specified
if (MONGODB_URL != null) {
  mongoConnection.connect();
} else {
  logger.error('MONGO_URL not specified in environment');
}

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  logger.info('Gracefully shutting down');
  mongoConnection.close(err => {
    if (err) {
      logger.log({
        level: 'error',
        message: 'Error shutting closing mongo connection',
        error: err
      });
    }
    process.exit(0);
  });
});


app.listen(WWW_PORT, (): void => {
  logger.info('\x1b[36m%s\x1b[0m', // eslint-disable-line
    `🌏 Express server started at http://localhost:${WWW_PORT}`);
});
