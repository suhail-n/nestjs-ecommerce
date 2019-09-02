import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.schema';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
    // allows for the use of DI for the following schemas in this current scope
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    providers: [UserService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
    ],
    // make available to other modules
    exports: [UserService]
})
export class SharedModule { }
