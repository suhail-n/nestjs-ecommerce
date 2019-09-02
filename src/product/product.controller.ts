import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { AuthGuard } from '@nestjs/passport';
import { SellerGuard } from '../guards/seller.guard';
import { UserDec } from '../utilities/user.decorator';
import { User } from '../types/user';
import { Product } from '../types/product';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Get()
    async listAll() {
        return await this.productService.findAll();
    }

    @Get('/mine')
    @UseGuards(AuthGuard(), SellerGuard)
    async listMine(@UserDec() user: User): Promise<Product[]> {
        return await this.productService.findByOwner(user.id);
    }

    @Get('/seller/:id')
    async listBySeller(@Param('id') id: string): Promise<Product[]> {
        return await this.productService.findByOwner(id);
    }

    @Post()
    @UseGuards(AuthGuard(), SellerGuard)
    async create(@Body() product: CreateProductDTO, @UserDec() user: User) {
        return this.productService.create(product, user)
    }

    @Get(':id')
    async read(@Param('id') id: string) {
        return await this.productService.findById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard(), SellerGuard)
    async update(
        @Param('id') id: string,
        @Body() product: UpdateProductDTO,
        @UserDec() user: User) {
        return await this.productService.update(id, product, user.id);
    }

    @Delete(':id')
    @UseGuards(AuthGuard(), SellerGuard)
    async delete(
        @Param('id') id: string,
        @UserDec() user: User) {
        return await this.productService.delete(id, user.id)
    }

}
