import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AtGuard, RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';


//Follow this URL: https://youtu.be/uAKzFhE3rxU?si=Ri6k7YT0ojtpDB5t
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}


    @Post('/local/singup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() dto:AuthDto):Promise<Tokens>{
        return this.authService.signupLocal(dto)
    }

    @Post('/local/singin')
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() dto:AuthDto):Promise<Tokens>{
        return this.authService.signinLocal(dto)
    }



    @UseGuards(AtGuard)
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: string){
        return this.authService.logout(userId) 
    }
    // logout(@Req() req: Request){
    //     const user = req.user;
    //    return this.authService.logout(user['sub'])
    // }

    
    @UseGuards(RtGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@GetCurrentUserId() userId: string, @GetCurrentUser('refreshToken') refreshToken: string){
        // const user = req.user;
        return this.authService.refreshTokens(userId,refreshToken)
    }
}
