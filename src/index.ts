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

import { Server } from './server';

export default new Server();
