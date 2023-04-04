import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostCreateValidate } from "./validations/create.post.validate";
import { PostUpdateValidate } from "./validations/update.post.validate";

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get()
  index() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id)
  }

  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.postService.findByUser(id);
  }

  @Post()
  store(@Body() data: PostCreateValidate) {
    return this.postService.store(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: PostUpdateValidate) {
    return this.postService.update(id, data)
  }

  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.postService.destroy(id)
  }
}