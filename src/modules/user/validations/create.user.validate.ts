import { IsEmail, IsNotEmpty } from 'class-validator'

import { IUserCreate } from '../dtos';

export class UserCreateValidate implements IUserCreate {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  imagem: string;

  @IsNotEmpty()
  pass: string;
}