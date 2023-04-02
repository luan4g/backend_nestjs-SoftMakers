import { IsNotEmpty } from 'class-validator'

export class UserBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  imagem: string;

  @IsNotEmpty()
  pass: string;
}