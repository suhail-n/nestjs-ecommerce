import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [MongooseModule.forRoot(
    process.env.MONGO_URI, { useNewUrlParser: true }), SharedModule, AuthModule, ProductModule, OrderModule],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule { }
