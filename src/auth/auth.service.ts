import { Injectable } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { sign } from 'jsonwebtoken';
import { User } from '../types/user';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async signPayload(payload: any): Promise<string> {
        // jsonwebtoken sign
        return sign(payload, process.env.SECRET || 'secretKey', {
            expiresIn: '1d'
        });
    }
    async validateUser(payload: any): Promise<User> {
        return await this.userService.findByPayload(payload);
    }
}
