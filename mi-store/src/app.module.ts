import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';

const SALUTE = 'Hello friend';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV],
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DB_NAME: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        SERVER_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    { provide: AppService, useClass: AppService },
    {
      provide: 'SALUTE_VALUE',
      useValue: SALUTE,
    },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = http.get('http://jsonplaceholder.typicode.com/todos');
        const tasks = await lastValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
