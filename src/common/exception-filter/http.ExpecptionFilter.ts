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

        const errorData = exception.getResponse();

        let detailsMsg = [];

        if (typeof errorData === 'object' && errorData['message']) {
            detailsMsg = errorData['message'];
        }

        if (typeof detailsMsg === 'object') {
            return response.status(status).json({
                success: false,
                statusCode: status,
                error: message,
                detailedErrors: detailsMsg
            });
        }
        return response.status(status).json({
            success: false,
            statusCode: status,
            error: message
        });
    }
}
