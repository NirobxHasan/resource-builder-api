import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../auth.service';
@Injectable()
export class AuthUserAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private authService: AuthService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request: Request = context.switchToHttp().getRequest();
            const response: Response = context.switchToHttp().getResponse();
            const accessToken: string = request.cookies['access_token'];
            const refreshToken: string = request.cookies['refresh_token'];

            if (!accessToken || !refreshToken)
                throw new UnauthorizedException();

            try {
                const payload = await this.jwtService.verifyAsync(accessToken, {
                    secret: 'at-strategy'
                });
                console.log('payload', payload);
                request.user = payload;
                return true;
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    console.log('------------for expired token-------');
                    const decodedToken = jwt.decode(accessToken);
                    console.log(decodedToken);

                    if (
                        !decodedToken ||
                        typeof decodedToken !== 'object' ||
                        !decodedToken.sub
                    ) {
                        throw new UnauthorizedException();
                    }

                    const tokens = await this.authService.refreshTokens(
                        decodedToken?.sub as string,
                        accessToken
                    );
                    // Set the new tokens in the response cookies
                    response.cookie('access_token', tokens.access_token, {
                        httpOnly: true
                    });
                    response.cookie('refresh_token', tokens.refresh_token, {
                        httpOnly: true
                    });

                    const newPayload = await this.jwtService.verifyAsync(
                        tokens.access_token,
                        {
                            secret: 'at-strategy'
                        }
                    );
                    request.user = newPayload;
                    return true;
                }

                throw new UnauthorizedException();
            }
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
