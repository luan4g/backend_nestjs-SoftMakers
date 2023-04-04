import { Module } from "@nestjs/common";
import { JwtService, JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/app/shared/prisma/prisma.service";

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService]
})

export class AuthModule { }