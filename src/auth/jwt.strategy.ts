import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../types/user';
import { Payload } from '../types/payload';
// import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET || 'secretKey'
        });
    }

    async validate(payload: Payload) {
        const user: User = await this.authService.validateUser(payload);
        if (!user) {
            throw new UnauthorizedException("Unauthorized Access");
        }
        return user;
    }
}
