import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';
import { CreatePostsDto } from './dto/create-posts-dto';
import * as fsExtra from 'fs-extra';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
  ) {}

  async createPosts(createPostsDto: CreatePostsDto) {
    return await this.postsRepository.createPosts(createPostsDto);
  }

  async getPostsTxt() {
    return await this.postsRepository.find();
  }

  async getPostsById(post_id: number) {
    const found = await this.postsRepository.findOne(post_id);
    if (!found) {
      throw new NotFoundException(`Post ${post_id} is not found`);
    }
    return found;
  }

  async deletePosts(post_id: number) {
    const found = await this.getPostsById(post_id);
    const { post_img } = found;
    await fsExtra.remove(`upload/${post_img}`);
    return await this.postsRepository.delete(post_id);
  }

  async updatePosts(post_id: number, createPostsDto: CreatePostsDto) {
    const post = await this.getPostsById(post_id);
    const { post_text } = createPostsDto;
    post.post_text = post_text;
    await post.save();
    return post;
  }
}
