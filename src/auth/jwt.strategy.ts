import { Injectable, UnauthorizedException, HttpException, HttpStatus } from "@nestjs/common";
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt"
import { PassportStrategy } from '@nestjs/passport'
// import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthService } from "./auth.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET || 'secretKey'
        })
    }

    async validate(payload: any, done: VerifiedCallback) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            return done(
                new HttpException('Unauthorized Access',
                    HttpStatus.UNAUTHORIZED),
                false
            );
        }
        return done(null, user, payload.iat);

    }
}