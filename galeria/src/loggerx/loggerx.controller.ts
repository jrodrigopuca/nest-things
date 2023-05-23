import { Controller, Get, Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import * as fs from 'fs';

@Controller('logs')
export class LogsController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get()
  async getLogs() {
    try {
      const file = '/Users/juan/Developer/try-nest/galeria/logois.log';
      const array = fs.readFileSync(file).toString();

      //.split('\n');
      //const newArray = array.map((item) => JSON.parse(item));
      /*for (const i in array) {
        console.log(array[i]);
      }*/
      return array;
    } catch (error) {
      console.error(error.toString());
      //console.error('mal lectura');
    }
  }
}
