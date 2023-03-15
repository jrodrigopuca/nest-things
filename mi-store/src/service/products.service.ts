import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private counter = 1;

  getAll() {
    if (this.products.length === 0) {
      throw new HttpException('Zero Products', HttpStatus.NO_CONTENT);
    }
    return this.products;
  }

  getOne(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  create(payload: any) {
    this.counter++;
    const newProduct = { id: this.counter, ...payload };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    this.products = this.products.map((product: any) => {
      if (product.id !== id) return product;
      return { ...product, ...payload };
    });
    return true;
  }

  delete(id: number) {
    this.products = this.products.filter((product: any) => product.id !== id);
    return true;
  }
}
