import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { LoggingService } from "src/logging/logging.service";
import { Request, Response } from "express";

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggingService) {}

    catch (exeption: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();

        const status = exeption instanceof HttpException ? exeption.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exeption instanceof HttpException ? exeption.getResponse() : 'Internal server error';

        this.logger.error(`Exception at ${req.method} ${req.url}`, JSON.stringify(exeption));
        res.status(status).json({ statusCode: status, message});
    }
}