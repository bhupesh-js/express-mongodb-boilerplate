import Application from './app';
import MongoConnection from './database/mongoConnection';
import { Logger, setupLogger } from './helpers/logger';
import { WWW_PORT, MONGODB_URL } from './helpers/config';

export class Server {
  express:any;

  constructor() {
    setupLogger(process.env.LOG_LEVEL);
    const logger = new Logger(__filename);
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
          logger.error('Error shutting closing mongo connection');
        }
        process.exit(0);
      });
    });


    Application().listen(WWW_PORT, (): void => {
      logger.info(
        `🌏 Express server started at http://localhost:${WWW_PORT}`
      );
    });
  }
}
