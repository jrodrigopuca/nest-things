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
  //ParseIntPipe,
} from '@nestjs/common';

import { Response } from 'express';
import { ParseIntPipe } from '../common/parse-int/parse-int.pipe';
import { ProductsService } from 'src/service/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.NOT_FOUND)
  getProductById(
    @Res() response: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const found = this.productsService.getOne(id);
    if (found) {
      response.status(200).send(found);
    } else {
      response.status(404).send();
    }
  }

  @Post()
  createProduct(@Body() payload: any) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() payload: any) {
    const product = this.productsService.getOne(parseInt(id));
    if (product) {
      return this.productsService.update(+id, payload);
    }
    return null;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    const product = this.productsService.getOne(parseInt(id));
    if (product) {
      return this.productsService.delete(+id);
    }
    return null;
  }
}
