import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString({ message: 'el nombre de ser un texto' })
  @IsNotEmpty({ message: 'el campo nombre no debe ir vacio' })
  @ApiProperty({ description: 'Nombre del usuario' })
  readonly username: string;

  @IsString({ message: 'el rol debe ser un texto' })
  @IsNotEmpty({ message: 'el campo descripción no debe ir vacio' })
  readonly rol: string;
}
