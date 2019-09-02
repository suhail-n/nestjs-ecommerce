import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserDec } from '../utilities/user.decorator';
import { User } from '../types/user';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './order.dto';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Get()
    @UseGuards(AuthGuard())
    listOrders(@UserDec() { id }: User) {
        return this.orderService.listOrdersByUser(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    createOrder(@Body() order: CreateOrderDTO, @UserDec() { id }: User) {
        return this.orderService.createOrder(order, id);
    }
}