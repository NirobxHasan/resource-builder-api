
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AtGuard, RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';


//Follow this URL: https://youtu.be/uAKzFhE3rxU?si=Ri6k7YT0ojtpDB5t
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}


    @Post('/local/singup')
    @HttpCode(HttpStatus.CREATED)
    async signupLocal(@Body() dto:AuthDto,@Res() res:Response):Promise<void>{
        const tokens = await this.authService.signupLocal(dto)
        res.cookie('access_token', tokens.access_token,{ httpOnly: true } )
        res.cookie('refresh_token', tokens.refresh_token,{ httpOnly: true } )
        res.send(tokens)
    }

    @Post('/local/singin')
    @HttpCode(HttpStatus.OK)
    async signinLocal(@Body() dto:AuthDto, @Res() res:Response):Promise<void>{
        const tokens = await this.authService.signinLocal(dto)
        res.cookie('access_token', tokens.access_token,{ httpOnly: true } )
        res.cookie('refresh_token', tokens.refresh_token,{ httpOnly: true } )
        res.send(tokens)
    }



    @UseGuards(AtGuard)
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    async logout(@GetCurrentUserId() userId: string, @Res() res:Response){
        await this.authService.logout(userId) 
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.send({
            status:"success"
        })
    }
    // logout(@Req() req: Request){
    //     const user = req.user;
    //    return this.authService.logout(user['sub'])
    // }

    
    @UseGuards(RtGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    async refreshTokens(@GetCurrentUserId() userId: string, @GetCurrentUser('refreshToken') refreshToken: string,@Res() res:Response){
        const tokens = await this.authService.refreshTokens(userId,refreshToken)
        res.cookie('access_token', tokens.access_token,{ httpOnly: true } )
        res.cookie('refresh_token', tokens.refresh_token,{ httpOnly: true } )
        res.send(tokens)
    }
}
