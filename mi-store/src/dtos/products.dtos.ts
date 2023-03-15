import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

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

export class UpdateProductsDto extends PartialType(CreateProductsDto) {}
