import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './../entities/user.entity';
import { Order } from './../entities/order.entity';
import { ProductsService } from './../../products/services/products.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  //inyectar un servicio de otro módulo
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  private users: User[] = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];

  getOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  getOrderByUser(id: number): Order {
    const user = this.getOne(id);
    const products = this.productsService.getAll();
    if (user && products) {
      return {
        date: new Date(),
        user,
        products,
      };
    } else {
      throw new BadRequestException('Order not found');
    }
  }

  getData() {
    const myConfig = this.configService.get('DB_NAME');
    console.log(myConfig);
    return 'config llega';
  }
}
