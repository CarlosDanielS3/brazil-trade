import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export class AddUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
