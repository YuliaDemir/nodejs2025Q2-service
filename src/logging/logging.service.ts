import { Injectable, LoggerService, LogLevel } from "@nestjs/common";
import path from "path";
import fs from 'fs';

@Injectable()
export class LoggingService implements LoggerService {
    private logFile: fs.WriteStream;
    private level: LogLevel;

    constructor() {
        const logLevel = process.env.LOG_LEVEL || 'log';
        this.level = logLevel as LogLevel;
        const logPath = path.join(__dirname, '../../logs/app.log');
        this.logFile = fs.createWriteStream(logPath, { flags: 'a' });

        process.on('uncaughtException', (err) => this.error(`Uncaught ${err.message}`, err.stack));
        process.on('unhandledRejection', (reas) => this.error(`Uncaught ${reas}`));
    }

    private write(message: string) {
        this.logFile.write(`[${new Date().toString()}] --> ${message}\n`);
    }

    log(message: string) {
        if (this.level === 'log') this.write(`LOG: ${message}`);
    }

    error(message: string, trace?: string) {
        this.write(`ERROR: ${message} ${trace || ''}`);
    }

    warn(message: string) {
        if (['log', 'warn'].includes(this.level)) this.write(`WARN: ${message}`);
    }

    debug(message: string) {
        if (this.level === 'debug') this.write(`DEBUG: ${message}`);
    }

    verbose(message: string) {
        if (this.level === 'verbose') this.write(`VEBOSE: ${message}`);
    }
}