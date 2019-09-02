import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log("before")
        const now = Date.now();
        const req: Request = context.switchToHttp().getRequest();
        const { method, url } = req;
        return next
            .handle()
            .pipe(
                tap(() => Logger.log(`[LoggingInterceptor] ${method} ${url} ${Date.now() - now}ms`, context.getClass().name)),
            );
    }
}