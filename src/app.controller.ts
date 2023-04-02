import { Body, Controller, Get, Post } from '@nestjs/common';

import { UserBody } from './dtos/create-user-upto-body';
import { UptoUserRepository } from './repositories/upto-user-repository';
import { UptoPostRepository } from './repositories/upto-post-repository';
import { PostBody } from './dtos/create-post-upto-body';

@Controller()
export class AppController {
  constructor(
    private uptoUserRepository: UptoUserRepository,
    private uptoPostRepository: UptoPostRepository) { }

  @Post('create/user')
  async createUser(@Body() body: UserBody) {
    const { name, email, imagem, pass } = body;

    await this.uptoUserRepository.create(name, email, imagem, pass);

    return {
      message: "Usuário criado."
    }
  }

  @Get('list/users')
  async listUsers() {
    const users = await this.uptoUserRepository.list();

    return users
  }

  @Post('create/post')
  async createPost(@Body() body: PostBody) {
    const { content, likes, userId } = body;

    await this.uptoPostRepository.create(content, likes, userId);

    return {
      message: "Post criado com sucesso."
    }
  }
}
