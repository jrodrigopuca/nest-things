import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('SALUTE_VALUE') private salute: string,
    @Inject('TASKS') private tasks: any[],
    @Inject('PROJ_NAME') private projName: string,
  ) {}

  getHello(): string {
    //console.log(this.tasks);
    return this.salute + ' from ' + this.projName;
  }
}
