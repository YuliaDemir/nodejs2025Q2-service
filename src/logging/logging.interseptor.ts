import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { LoggingService } from "./logging.service";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggingService) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const { method, url, query, body } = req;

        this.logger.log(`[Request] ${method} ${url}`);
        this.logger.debug(`Query: ${JSON.stringify(query)}`);
        this.logger.log(`Body:  ${JSON.stringify(body)}`);
        
        const now = Date.now();
        return next.handle().pipe(
            tap(() => {
                const res = context.switchToHttp().getResponse();
                const status = res.statusCode;
                this.logger.log(`[Response] ${status} (${Date.now() - now} ms)`);
            }),
        );
    }
}