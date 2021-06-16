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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostsDto } from './dto/create-posts-dto';
import { PostsService } from './posts.service';
import * as fsExtra from 'fs-extra';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  // @Get()
  // getPost() {
  //   return this.postsService.getPostsTxt();
  // }

  @Get('/:post_id')
  getPostsById(@Param('post_id') post_id: number) {
    return this.postsService.getPostsById(post_id);
    return `${post_id}`;
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @UsePipes(ValidationPipe)
  async addPosts(@UploadedFile() file, @Body() createPostsDto: CreatePostsDto) {
    const posts = await this.postsService.createPosts(createPostsDto);
    const imageFile = posts.post_id + extname(file.filename);
    fsExtra.move(file.path, `upload/${imageFile}`);
    posts.post_img = imageFile;
    await posts.save();
    return posts;
    return this.postsService.createPosts(createPostsDto);
  }

  @Delete('/:post_id')
  deletePostsById(@Param('post_id') post_id: number) {
    return this.postsService.deletePosts(post_id);
    return `${post_id}`;
  }

  @Patch('/:post_id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updatePostsById(
    @UploadedFile() file,
    @Param('post_id') post_id: number,
    @Body() createPostsDto: CreatePostsDto,
  ) {
    const post = await this.postsService.updatePosts(post_id, createPostsDto);
    if (file) {
      fsExtra.remove(`upload/${post.post_img}`);
      const imageFile = post_id + extname(file.filename);
      fsExtra.move(file.path, `upload/${imageFile}`);
      post.post_img = imageFile;
      await post.save();
    }
    return post;
  }
}
