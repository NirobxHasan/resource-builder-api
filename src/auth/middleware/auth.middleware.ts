// import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { AuthService } from '../auth.service';


// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(private readonly authService: AuthService) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     const accessToken = req.cookies['access_token'];
//     if (accessToken) {
//       try {
//         req.user = this.authService.jwtService.verify(accessToken, { secret: 'your_access_token_secret' });
//         return next();
//       } catch (err) {
//         if (err.name === 'TokenExpiredError') {
//           const refreshToken = req.cookies['refresh_token'];
//           const newAccessToken = await this.authService.refreshAccessToken(refreshToken);
//           if (newAccessToken) {
//             res.cookie('access_token', newAccessToken.accessToken, { httpOnly: true });
//             req.user = this.authService.jwtService.verify(newAccessToken.accessToken, { secret: 'your_access_token_secret' });
//             return next();
//           }
//         }
//       }
//     }
//     throw new UnauthorizedException();
//   }
// }
