import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
@Global()
@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, AtStrategy, RtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
