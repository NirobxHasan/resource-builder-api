import {
    ConflictException,
    ForbiddenException,
    Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SignupDto } from './dto';
import { Tokens } from './types';
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    hashData(data: string) {
        return bcrypt.hash(data, 10);
    }

    async getTokens(userId: string, email: string): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email
                },
                {
                    secret: 'at-strategy',
                    expiresIn: 60 * 60 * 15
                }
            ),

            this.jwtService.signAsync(
                {
                    sub: userId,
                    email
                },
                {
                    secret: 'rt-strategy',
                    expiresIn: 60 * 60 * 80
                }
            )
        ]);

        return {
            access_token: at,
            refresh_token: rt
        };
    }

    async findUser(email: string) {
        const data = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return data;
    }

    async signupLocal(dto: SignupDto): Promise<Tokens> {
        if (await this.findUser(dto.email)) {
            throw new ConflictException('This email is already registered');
        }

        const hash = await this.hashData(dto.password);
        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                first_name: dto.first_name,
                last_name: dto.last_name,
                phone: dto.phone,
                hash
            }
        });

        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRtHash(newUser.id, tokens.refresh_token);
        return tokens;
    }

    async updateRtHash(userId: string, refreshToken: string) {
        const refreshTokenHash = await this.hashData(refreshToken);
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hashRt: refreshTokenHash
            }
        });
    }

    async signinLocal(dto: AuthDto): Promise<Tokens> {
        const user = await this.findUser(dto.email);

        if (!user) throw new ForbiddenException('Access Denied');

        const passwordMatches = await bcrypt.compare(dto.password, user.hash);

        if (!passwordMatches) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }
    async logout(userId: string) {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashRt: {
                    not: null
                }
            },
            data: {
                hashRt: null
            }
        });
    }

    async refreshTokens(userId: string, rt: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) throw new ForbiddenException('Access Denided');

        const rtMarches = await bcrypt.compare(rt, user.hashRt);
        if (!rtMarches) throw new ForbiddenException('Access Denided');

        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }

    async googleLogin(req): Promise<Tokens> {
        if (!req.user) {
            throw new ForbiddenException('Access Denied');
        }

        console.log('google user', req.user);

        let user = await this.findUser(req.user.email);

        // for new user
        if (!user) {
            const newUser = await this.prisma.user.create({
                data: {
                    email: req.user.email,
                    first_name: req.user.first_name,
                    last_name: req.user.last_name,
                    auth_provider: 'GOOGLE'
                }
            });
            const tokens = await this.getTokens(newUser.id, newUser.email);
            await this.updateRtHash(newUser.id, tokens.refresh_token);
            return tokens;
        }

        //For existing user
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }
}
