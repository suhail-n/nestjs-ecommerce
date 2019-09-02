import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { User } from '../types/user';
import { Payload } from '../types/payload';
// import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async signPayload(payload: Payload): Promise<string> {
        // user is authenticated before calling this
        // return a token once you verify user credentials
        // jsonwebtoken sign
        return this.jwtService.signAsync(payload)
    }

    async validateUser(payload: Payload): Promise<User> {
        return await this.usersService.findByPayload(payload)
    }
}