import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}


    @Post('/local/singup')
    signupLocal(@Body() dto:AuthDto):Promise<Tokens>{
        return this.authService.signupLocal(dto)
    }

    @Post('/local/singin')
    signinLocal(@Body() dto:AuthDto):Promise<Tokens>{
        return this.authService.signinLocal(dto)
    }

    @Post('/logout')
    logout(){
        this.authService.logout()
    }

    @Post('/refresh')
    refreshTokens(){
        this.authService.refreshTokens()
    }
}
