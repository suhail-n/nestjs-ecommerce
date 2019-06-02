import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../types/user';
import { RegisterDTO, LoginDTO } from '../auth/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    private sanitizeUser(user: User): User {
        const userObj = user.toObject();
        delete userObj['password']
        return userObj;
    }

    async create(userDTO: RegisterDTO): Promise<User> {
        console.log(userDTO);
        const { username } = userDTO;
        console.log(username);
        const user: User = await this.userModel.findOne({ username })
        console.log(user)
        if (user) {
            console.log("Found user")
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const createdUser: User = new this.userModel(userDTO);
        console.log('createdUser: ' + createdUser.username)
        console.log(createdUser)
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }

    async findByLogin(userDTO: LoginDTO): Promise<User> {
        const { username, password } = userDTO;
        const user: User = await this.userModel.findOne({ username })
        if (!user) {
            throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
        }
        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user)
        } else {
            throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
        }
    }
    async findByPayload(payload: any): Promise<User> {
        const { username } = payload;
        return await this.userModel.findOne({ username });
    }

}
