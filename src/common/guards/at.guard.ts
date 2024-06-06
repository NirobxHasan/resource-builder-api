import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

export class AtGuard extends AuthGuard('jwt') {
    constructor(private jwtService: JwtService) {
        super();
    }
}
