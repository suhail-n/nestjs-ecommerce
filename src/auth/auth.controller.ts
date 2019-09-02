import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';

import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '../types/user';
import { Payload } from '../types/payload';
import { UserDec } from '../utilities/user.decorator';
import { SellerGuard } from '../guards/seller.guard';


@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    @Get()
    @UseGuards(AuthGuard())
    async tempAuth(): Promise<{ auth: string }> {
        return { auth: 'works' };
    }

    @Get("all")
    @UseGuards(AuthGuard(), SellerGuard)
    async fundAll(@UserDec() user: any) {
        console.log(user)
    }

    @Post('login')
    async login(@Body() userDTO: LoginDTO): Promise<any> {
        // find the user in database
        const user: User = await this.userService.findByLogin(userDTO);
        // add payload
        const payload: Payload = {
            username: user.username,
            seller: user.seller,
        };
        // use authservice to signpaylaod using jwt
        const token: string = await this.authService.signPayload(payload);
        // return the found user with token
        return { user, token };
    }

    @Post('register')
    async register(@Body() userDTO: RegisterDTO): Promise<any> {
        return await this.userService.create(userDTO);
        //     const user = await this.userService.create(userDTO);
        //     const payload: Payload = {
        //         username: user.username,
        //         seller: user.seller,
        //     };
        //     const token = await this.authService.signPayload(payload);
        //     return { user, token };
    }
}