import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';
import { AtGuard, RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dto';
import { AuthUserAuthGuard } from './guards/auth.guard';

//Follow this URL: https://youtu.be/uAKzFhE3rxU?si=Ri6k7YT0ojtpDB5t
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/local/singup')
    @HttpCode(HttpStatus.CREATED)
    async signupLocal(
        @Body() dto: SignupDto,
        @Res() res: Response
    ): Promise<void> {
        const tokens = await this.authService.signupLocal(dto);
        res.cookie('access_token', tokens.access_token, { httpOnly: true });
        res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
        res.send(tokens);
    }

    @Post('/local/singin')
    @HttpCode(HttpStatus.OK)
    async signinLocal(
        @Body() dto: AuthDto,
        @Res() res: Response
    ): Promise<any> {
        const tokens = await this.authService.signinLocal(dto);
        res.cookie('access_token', tokens.access_token, { httpOnly: true });
        res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });

        res.send(tokens);
    }

    @UseGuards(AtGuard)
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    async logout(@GetCurrentUserId() userId: string, @Res() res: Response) {
        await this.authService.logout(userId);
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.send({
            status: 'success'
        });
    }
    // logout(@Req() req: Request){
    //     const user = req.user;
    //    return this.authService.logout(user['sub'])
    // }

    @UseGuards(RtGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    async refreshTokens(
        @GetCurrentUserId() userId: string,
        @GetCurrentUser('refreshToken') refreshToken: string,
        @Res() res: Response
    ) {
        const tokens = await this.authService.refreshTokens(
            userId,
            refreshToken
        );
        res.cookie('access_token', tokens.access_token, { httpOnly: true });
        res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
        res.send(tokens);
    }

    @UseGuards(AuthUserAuthGuard)
    @Get('/me')
    async hello(@GetCurrentUserId() userId: string) {
        return userId;
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res: Response) {
        const tokens = await this.authService.googleLogin(req);
        res.cookie('access_token', tokens.access_token, { httpOnly: true });
        res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
        // window.location.href = 'http://localhost:3000/auth/google'; // U
        res.redirect('http://localhost:8000/auth/google');
    }
}

// ya29.a0AXooCgtdV24bnwptt65t-22ZrIJ3iNH5OdFetCeXWLRZKMKtVLOV_l-Dp-kwCeEsaqu2MMRoczVnW0oxTjXMIyjlN9Vb6WrQaNe8jwQ4IZ9LZHZauSpgNPWI1Oct9LqveDln4YfgCMinNpvPMcJbaF4rh3PK7pqhjMG9aCgYKAZASARMSFQHGX2MiT7NIHbaWCfm-A2lRv9VO2A0171
