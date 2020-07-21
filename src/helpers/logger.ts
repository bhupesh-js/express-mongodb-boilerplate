import {
  createLogger,
  format,
  transports
} from 'winston';

import { Loggly } from 'winston-loggly-bulk';
import {
  LOGGER_CONSOLE, LOGGLY_ACCESS_TOKEN, LOGGLY_SUBDOMAIN
} from './config';


const DEFAULT_LOG_LEVEL = 'info';


// init log transports
const logTransports = [];

// register console transport if allowed
if (LOGGER_CONSOLE) {
  logTransports.push(new transports.Console({ format: format.prettyPrint() }));
}

// register LOGGLY transport if configured
if (LOGGLY_ACCESS_TOKEN && LOGGLY_SUBDOMAIN) {
  logTransports.push(
    new Loggly({
      token: LOGGLY_ACCESS_TOKEN,
      subdomain: LOGGLY_SUBDOMAIN,
      tags: ['NodeJS', 'Boilerplate'],
      json: true,
      stripColors: true
    })
  );
}


const logger = createLogger({
  level: DEFAULT_LOG_LEVEL,
  transports: logTransports,
  defaultMeta: { service: 'api' }
});

export default logger;
