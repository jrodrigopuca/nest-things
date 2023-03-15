import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const valueInt = parseInt(value);
    if (isNaN(valueInt)) {
      throw new BadRequestException('Valor no númerico');
    }
    return value;
  }
}
