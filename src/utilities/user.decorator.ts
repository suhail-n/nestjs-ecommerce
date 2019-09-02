import { createParamDecorator } from "@nestjs/common";
import { Request } from "express";

// returns the user object to a routehandler parameter
export const UserDec = createParamDecorator((data, req: Request) => req.user);