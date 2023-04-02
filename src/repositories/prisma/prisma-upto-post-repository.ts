import { randomUUID } from "crypto";

import { UptoPostRepository } from "../upto-post-repository";
import { PrismaService } from "src/prisma/prisma.service";

export class PrismaUptoPostRepository implements UptoPostRepository {
  constructor(private prisma: PrismaService) { }

  async create(content: string, likes: number, userId: string): Promise<void> {
    await this.prisma.post.create({
      data: {
        id: randomUUID(),
        content,
        likes,
        userId,
      }
    })
  }
}