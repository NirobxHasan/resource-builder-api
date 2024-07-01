import {
    Catch,
    ExceptionFilter,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable
} from '@nestjs/common';

@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, context: ExecutionContext) {
        const response = context.switchToHttp().getResponse();
        const status = exception.getStatus()
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        const errorMessage = exception.message;

        const errorData = exception.getResponse();

        let detailsMsg = [];

        if (typeof errorData === 'object' && errorData['message']) {
            detailsMsg = errorData['message'];
        }

        if (typeof detailsMsg === 'object') {
            return response.status(status).json({
                success: false,
                statusCode: status,
                error: errorMessage,
                message: detailsMsg
            });
        }
        return response.status(status).json({
            success: false,
            statusCode: status,
            error: errorMessage
        });
    }
}
