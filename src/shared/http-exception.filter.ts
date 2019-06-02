import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse();
        const request: Request = ctx.getRequest();
        const status = exception.getStatus() ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const errorRes = {
            status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: status !== HttpStatus.INTERNAL_SERVER_ERROR ?
                exception.message.error || exception.message || null : 'Internal Server Error'
        };
        return response.status(status).json(errorRes);
    }

} 