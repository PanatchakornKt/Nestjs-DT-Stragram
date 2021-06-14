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
import { Posts } from './posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
//import { ChangeStringCasePipe } from '../pipe/change-string-case.pipe';
import { PostsRepository } from './posts.repository';

@Controller('posts')
export class PostsController {
  constructor(
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
  ) {}
  @Get()
  getPosts() {
    return this.postsRepository.find();
  }

  @Post()
  @UsePipes(ValidationPipe)
  //@UsePipes(new ChangeStringCasePipe())
  addPosts(@Body() createPostsDto: CreatePostsDto) {
    const { post_text } = createPostsDto;
    console.log(`${post_text}`);

    const posts = new Posts();
    posts.post_text = post_text;
    posts.save();
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
