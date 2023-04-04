import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../../app/shared/prisma/prisma.service";
import { IPostCreate, IPostUpdate } from "./dtos";

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) { }

  private async findById(id: string) {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id,
        }, select: {
          userId: true,
          content: true,
          likes: true,
          created_at: true
        }
      });

      return post;
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  private async findByUserId(id: string) {
    try {
      const posts = await this.prismaService.user.findUnique({
        where: {
          id
        }, select: {
          posts: {
            select: {
              content: true,
              likes: true,
              created_at: true,
              userId: true,
            }
          }
        }
      })

      return posts
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const posts = await this.prismaService.post.findMany();

      return posts;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    const post = await this.findById(id);

    if (!post) {
      throw new NotFoundException();
    } else {
      return post
    }
  }

  async findByUser(id: string) {
    const posts = await this.findByUserId(id);
    console.log(posts)

    if (!posts) {
      throw new NotFoundException();
    } else {
      return posts
    }
  }

  async store(data: IPostCreate) {
    try {
      await this.prismaService.post.create({
        data: {
          ...data,
          likes: 0
        }
      })
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, data: IPostUpdate) {
    const post = await this.findById(id)

    if (!post) {
      throw new NotFoundException();
    } else {
      await this.prismaService.post.update({
        where: {
          id
        }, data
      })
    }
  }

  async destroy(id: string) {
    const post = await this.findById(id)

    if (!post) {
      throw new NotFoundException();
    } else {
      await this.prismaService.post.delete({ where: { id } })
    }
  }
}