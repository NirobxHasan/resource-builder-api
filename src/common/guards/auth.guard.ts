import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private authService: AuthService
    ) {}

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
            console.log('Dtaaaa', payload);
            request.user = payload;
            return true;
        } catch (error) {
            console.log(error.message);

            if (error.message === 'jwt expired') {
                const request: Request = context.switchToHttp().getRequest();
                const response: Response = context.switchToHttp().getResponse();
                const token: string = request.cookies['refresh_token'];
                try {
                    const payload = await this.jwtService.verifyAsync(token, {
                        secret: 'rt-strategy'
                    });

                    const tokens = await this.authService.refreshTokens(
                        payload.sub,
                        token
                    );

                    response.cookie('access_token', tokens.access_token, {
                        httpOnly: true
                    });
                    response.cookie('refresh_token', tokens.refresh_token, {
                        httpOnly: true
                    });

                    request.user = payload;
                    return true;
                } catch (error) {
                    throw new UnauthorizedException();
                }
            }
            throw new UnauthorizedException();
        }
    }
}
