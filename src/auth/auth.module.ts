import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { GoogleStrategy } from './strategies/google.strategy';
@Global()
@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, AtStrategy, RtStrategy, GoogleStrategy],
    exports: [AuthService]
})
export class AuthModule {}
