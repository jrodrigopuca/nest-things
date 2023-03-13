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
