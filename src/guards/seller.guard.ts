import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { User } from "../types/user";

@Injectable()
export class SellerGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const user: User = request.user;
        if (user && user.seller) return true;

        throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);
    }

}