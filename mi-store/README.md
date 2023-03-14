## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Controller

```
  // Creando nuevo controller
  @Get('tasks')
  newEndpoint() {
    return 'nuevo GET';
  }

  // Controller con params
  @Get('tasks/:id')
  newEndpointWithParam(@Param() params: any) {
    return `Get con ${params.id}`;
  }

  // Controller especificando un solo param
  @Get('tasks/:id')
  newEndpointWithParam(@Param('id') id: string) {
    return `Get con ${id}`;
  }

  // Controller con más de un param
  @Get('tasks/:taskId/:userId')
  newEndpointWithParam(
    @Param('taskId') taskId: string,
    @Param('userId') userId: string,
  ) {
    return `Get con tarea ${taskId} para usuario ${userId}`;
  }

  // Controller con Query Params
  //ej: http://localhost:3000/tasks?limit=50&offset=10
  @Get('tasks')
  newEndpoint(@Query() params: any) {
    const { limit, offset } = params;
    return `nuevo GET con limit ${limit} y offset ${offset}`;
  }

  // Controller con Query Params específicos
  // para este caso, infiere que limit es numeric
  @Get('tasks')
  newEndpoint(
    @Query('limit') limit = 100,
    @Query('offset') offset: number) {
    return `nuevo GET con limit ${limit} y offset ${offset}`;
  }
```

### Creando Controller

```
  // Crear controller desde Terminal
  $ nest g controller products

  // Crear controller desde Terminal en carpeta controller
  $ nest g controller controllers/products --flat
```

### Controller: POST

```
  // POST
  @Post()
  create(@Body() payload: any) {
    return {
      message: 'creado',
      payload,
    };
  }

```

### Controller: Ejemplo

```
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  private products: string[] = [];

  @Get()
  getProducts() {
    return this.products;
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
```

### Controller: Usando HttpStatus

```
import {Res} from '@nestjs/common';

import { Response } from 'express';
  // POST
  @Post()
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

```
