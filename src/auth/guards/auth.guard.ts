import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthUserAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request: Request = context.switchToHttp().getRequest();
            const token: string = request.cookies['access_token'];
            console.log(token);
            if (!token) throw new UnauthorizedException();
            console.log('first');
            const payload = await this.jwtService.verifyAsync(token, {
                secret: 'at-strategy'
            });
            console.log(payload);

            request.user = payload;
            return true;
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException();
        }
    }
}
