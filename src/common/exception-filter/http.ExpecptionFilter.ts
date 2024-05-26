import {
    Catch,
    ExceptionFilter,
    ExecutionContext,
    HttpException,
    Injectable
} from '@nestjs/common';

@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, context: ExecutionContext) {
        const response = context.switchToHttp().getResponse();
        const status = exception.getStatus();
        const message = exception.message;

        response.status(status).json({
            success: false,
            statusCode: status,
            error: message
        });
    }
}
