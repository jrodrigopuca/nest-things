import { Module, Global } from '@nestjs/common';

const PROJ_NAME = 'products';
const PROJ_NAME_PROD = 'productos';

@Global()
@Module({
  providers: [
    {
      provide: 'PROJ_NAME',
      useValue: process.env.NODE_ENV === 'prod' ? PROJ_NAME_PROD : PROJ_NAME,
    },
  ],
  exports: ['PROJ_NAME'],
})
export class DatabaseModule {}
