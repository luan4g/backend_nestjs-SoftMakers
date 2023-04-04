import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { IUserCreate, IUserUpdate } from "./dtos";
import { PrismaService } from "../../app/shared/prisma/prisma.service";
import { hash } from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  private async findById(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          imagem: true,
          email: true
        }
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findAll() {
    try {
      const users = await this.prismaService.user.findMany();

      return users;
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: string) {
    const user = await this.findById(id);

    console.log(user)

    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  async store(data: IUserCreate) {
    try {
      data.pass = await hash(data.pass, Number(process.env.ROUNDS))

      await this.prismaService.user.create({
        data
      })
    } catch (error: any) {
      if (error.meta.target[0].includes('email')) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: "E-mail already exists!"
        }, HttpStatus.BAD_REQUEST)
      }

      throw new InternalServerErrorException();
    }
  }

  async update(id: string, data: IUserUpdate) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException();
    } else {
      await this.prismaService.user.update({
        where: {
          id
        }, data
      })
    }
  }

  async destroy(id: string) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException();
    } else {
      await this.prismaService.user.delete({
        where: {
          id
        }
      })
    }
  }
}