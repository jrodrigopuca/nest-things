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
    return {
      message: 'creado',
      payload,
    };
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
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

## servicio

```
$ nest generate service service/products --flat
```

### Ejemplo

```
import { Injectable } from '@nestjs/common';
import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private counter = 1;

  getAll() {
    return this.products;
  }

  getOne(id: number) {
    return this.products.find((product) => product.id === id);
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
```

### Ejemplo: Manejo de excepciones

Pueden hacer con HttpException (que es el más generico)
Otras opciones:

- NotFoundException (404)
- InternalServerErrorException (500)
- Más https://docs.nestjs.com/exception-filters#built-in-http-exceptions

```
  getOne(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
```

## Pipes

Se usan para validar o transformar
se pueden traer desde @nestjs/common'

```
  getProductById(
    @Res() response: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {...
  }
```

### Creando propios pipes

```
 nest g pipe common/parse-int
```

Ejemplo:

```
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const valueInt = parseInt(value);
    if (isNaN(valueInt)) {
      throw new BadRequestException('Valor no númerico');
    }
    return value;
  }
}
```

## Validación

```
yarn add class-validator class-transformer
yarn add @nestjs/mapped-types
```

Se crea una validación para los datos que llegan al controller, antes de que lleguen al service
para ello es necesario crear un esquema o Dto

```
export class CreateProductsDto {
  @IsString({ message: 'el nombre de ser un texto' })
  @IsNotEmpty({ message: 'el campo nombre no debe ir vacio' })
  readonly name: string;

  @IsString({ message: 'la descripción debe ser un texto' })
  @IsNotEmpty({ message: 'el campo descripción no debe ir vacio' })
  readonly description: string;

  @IsNumber({}, { message: 'el precio debe ser un valor númerico' })
  @IsNotEmpty({ message: 'el campo precio no debe ir vacio' })
  @IsPositive({ message: 'el campo precio debe ser positivo' })
  readonly price: number;
}
```

Para activar la validación de los campos se realiza de manera general en el main:

```
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // se agrega un pipe de validación
  // whitelist: ignora los atributos que no estan definidos en el DTO
  // forbidNonWhitelisted: alerta si hay un atributo no definido en el DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
```

## Módulos

sirven para segmentar el software en partes más pequeñas

```
$ nest g module users
```
