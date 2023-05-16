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
import { ParseIntPipe } from './../../common/parse-int/parse-int.pipe';
import { ProductsService } from './../services/products.service';
import { CreateProductsDto, UpdateProductsDto } from './../dtos/products.dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products') // Separa por grupo
@Controller('products')
export class ProductsController {
  //inyección de un servicio en un controlador
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'lista de productos' })
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
  createProduct(@Body() payload: CreateProductsDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() payload: UpdateProductsDto) {
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
