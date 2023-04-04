import { IsNotEmpty, Length } from "class-validator";
import { IPostCreate } from "../dtos";

export class PostCreateValidate implements IPostCreate {
  @IsNotEmpty()
  @Length(1, 500)
  content: string;

  @IsNotEmpty()
  userId: string;
}