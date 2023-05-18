import { Injectable, Inject } from '@nestjs/common';
import config from './config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AppService {
  //@Inject('SALUTE_VALUE') private salute: string,
  //@Inject('TASKS') private tasks: any[],
  //@Inject('PROJ_NAME') private projName: string,
  //@Inject(config.KEY) private configService: ConfigType<typeof config>,

  getHello(): string {
    //console.log(this.tasks);
    //console.log(this.configService.database.name);
    //return this.salute + ' from ' + this.projName;
    return 'hello friend';
  }
}
