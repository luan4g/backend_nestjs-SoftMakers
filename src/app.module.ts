import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { UptoUserRepository } from './repositories/upto-user-repository';
import { PrismaUptoUserRepository } from './repositories/prisma/prisma-upto-user-repository';
import { UptoPostRepository } from './repositories/upto-post-repository';
import { PrismaUptoPostRepository } from './repositories/prisma/prisma-upto-post-repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: UptoUserRepository,
      useClass: PrismaUptoUserRepository
    },
    {
      provide: UptoPostRepository,
      useClass: PrismaUptoPostRepository
    }
  ],
})
export class AppModule { }
