import { IsEmail, IsNotEmpty } from "class-validator";

import { IUserAuth } from "../dtos";

export class UserAuthValidate implements IUserAuth {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  pass: string;
}