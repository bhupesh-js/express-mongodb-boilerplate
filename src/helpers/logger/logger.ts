/* eslint-disable no-param-reassign */
import * as path from 'path';
import * as winston from 'winston';
import { ILogger } from './logger.interface';
import { Context } from '../context';

export class Logger implements ILogger {
    public static DEFAULT_SCOPE = 'app';

    private static parsePathToScope(filepath: string): string {
      if (filepath.indexOf(path.sep) >= 0) {
        filepath = filepath.replace(process.cwd(), '');
        filepath = filepath.replace(`${path.sep}src${path.sep}`, '');
        filepath = filepath.replace(`${path.sep}dist${path.sep}`, '');
        filepath = filepath.replace('.ts', '');
        filepath = filepath.replace('.js', '');
        filepath = filepath.replace(path.sep, ':');
      }
      return filepath;
    }

    private scope: string;

    constructor(scope?: string) {
      this.scope = Logger.parsePathToScope((scope) || Logger.DEFAULT_SCOPE);
    }

    public debug(message: string, ...args: any[]): void {
      this.log('debug', message, args);
    }

    public info(message: string, ...args: any[]): void {
      this.log('info', message, args);
    }

    public warn(message: string, ...args: any[]): void {
      this.log('warn', message, args);
    }

    public error(message: string, ...args: any[]): void {
      this.log('error', message, args);
    }

    private log(level: string, message: string, args: any[]): void {
      winston.log(level, `${this.formatScope()} ${this.appendRequestId(message)}`, args);
    }

    private formatScope(): string {
      return `[${this.scope}]`;
    }

    private appendRequestId(message: string): string {
      const requestId = Context.getRequestId();
      if (requestId) {
        return `-- Request Id ${requestId}: ${message}`;
      }
      return message;
    }
}
