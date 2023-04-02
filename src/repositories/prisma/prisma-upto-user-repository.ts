import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { UptoUserRepository } from "../upto-user-repository";
import { UserBody } from "src/dtos/create-user-upto-body";

@Injectable()
export class PrismaUptoUserRepository implements UptoUserRepository {
  constructor(private prisma: PrismaService) { }

  async create(name: string, email: string, imagem: string, pass: string): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: randomUUID(),
        name,
        email,
        imagem,
        pass
      }
    })
  }

  async list(): Promise<UserBody[]> {
    const user = await this.prisma.user.findMany();

    return user
  }
}