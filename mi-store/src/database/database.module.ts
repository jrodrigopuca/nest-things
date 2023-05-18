import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pass123',
      database: 'mini-store',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
