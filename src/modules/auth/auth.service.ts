import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { compare } from 'bcrypt'
import { JwtService } from "@nestjs/jwt";

import { PrismaService } from "src/app/shared/prisma/prisma.service";
import { IUserAuth } from "./dtos";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  private async findByEmail(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email
        }
      })

      return user
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async auth(data: IUserAuth) {
    const user = await this.findByEmail(data.email);

    if (!user) {
      throw new NotFoundException();
    } else {
      const res = compare(data.pass, user.pass);

      if (!res) {
        throw new UnauthorizedException();
      } else {
        const payload = {
          email: user.email,
          imagem: user.imagem,
          userId: user.id,
          name: user.name
        }

        return {
          access_token: this.jwtService.sign(payload, {
            expiresIn: '3d',
            secret: `${process.env.SECRET_KEY}`
          })
        }
      }
    }
  }
}