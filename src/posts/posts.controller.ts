import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreatePostsDto } from './dto/create-posts-dto';

@Controller('posts')
export class PostsController {
  @Get()
  getPosts() {
    return 'katang';
  }
  @Post()
  @UsePipes(ValidationPipe)
  addPosts(@Body() createPostsDto: CreatePostsDto) {
    const { post_text } = createPostsDto;
    console.log(`${post_text}`);
  }

  @Get('/:post_id')
  getPostsById(@Param('post_id') post_id: number) {
    return `Id is ${post_id}`;
  }

  @Delete('/:post_id')
  deletePostsById(@Param('post_id') post_id: number) {
    return `Delete is ${post_id}`;
  }

  @Patch('/:post_id')
  updatePostsById(
    @Param('post_id') post_id: number,
    @Body() createPostsDto: CreatePostsDto,
  ) {
    const { post_text } = createPostsDto;
    return `Update is ${post_id}, ${post_text}`;
  }
}
