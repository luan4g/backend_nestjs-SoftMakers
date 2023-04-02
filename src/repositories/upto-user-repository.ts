import { UserBody } from "src/dtos/create-user-upto-body";

export abstract class UptoUserRepository {
  abstract create(
    name: string,
    email: string,
    imagem: string,
    pass: string
  ): Promise<void>

  abstract list(): Promise<UserBody[]>
}