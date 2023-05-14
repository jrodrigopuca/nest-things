import { Module } from '@nestjs/common';
import { ProductsModule } from './../products/products.module';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './service/users.service';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
