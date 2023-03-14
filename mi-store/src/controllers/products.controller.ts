import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

@Controller('products')
export class ProductsController {
  private products: string[] = [];

  @Get()
  getProducts() {
    return this.products;
  }

  @Get(':id')
  @HttpCode(HttpStatus.NOT_FOUND)
  getProductById(@Res() response: Response, @Param('id') id: string) {
    const found = this.products.filter(
      (product: any) => product.id === parseInt(id),
    );
    console.log(found.length);

    if (found.length > 0) {
      response.status(200).send(found);
    } else {
      response.status(404).send();
    }
  }

  @Post()
  createProduct(@Body() payload: any) {
    payload.id = Math.floor(Math.random() * 100);
    this.products.push(payload);
    return {
      message: 'creado',
      payload,
    };
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() payload: any) {
    this.products = this.products.map((product: any) =>
      product.id === parseInt(id) ? { ...product, ...payload } : { ...product },
    );

    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    this.products = this.products.filter(
      (product: any) => product.id !== parseInt(id),
    );
    return {
      id,
    };
  }
}
