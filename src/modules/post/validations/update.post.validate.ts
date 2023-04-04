import { IsNotEmpty, Length } from "class-validator";
import { IPostUpdate } from "../dtos";

export class PostUpdateValidate implements IPostUpdate {
  @IsNotEmpty()
  @Length(1, 500)
  content: string;
}