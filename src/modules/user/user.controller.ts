import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";

import { UserService } from "./user.service";
import { UserCreateValidate } from "./validations/create.user.validate";
import { UserUpdateValidate } from "./validations/update.user.validate";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  index() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  store(@Body() data: UserCreateValidate) {
    return this.userService.store(data);
  }

  @Put(':id')
  @HttpCode(204)
  update(@Param('id') id: string, @Body() data: UserUpdateValidate) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  destroy(@Param('id') id: string) {
    return this.userService.destroy(id);
  }
}