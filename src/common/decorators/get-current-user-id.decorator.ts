import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
    (data: undefined, context: ExecutionContext): string => {
        const request = context.switchToHttp().getRequest();
        console.log('Reques params', request.user);
        return request.user['sub'];
    }
);
