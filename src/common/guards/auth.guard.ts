import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';


class UserAuthGuard extends AuthGuard('jwt') implements CanActivate{
    constructor(){
        super()
    }
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request :Request = context.switchToHttp().getRequest();
            const token: Request = request.cookies['jwt']
            if(!token) throw new UnauthorizedException();

            
            return true
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}