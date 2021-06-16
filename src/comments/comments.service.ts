import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comments-dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository,
  ) {}

  createComments(createCommentDto: CreateCommentDto) {
    return this.commentsRepository.createComments(createCommentDto);
  }

  // getComments() {
  //   return this.commentsRepository.find();
  // }

  async getCommentsById(comment_id: number) {
    const found = await this.commentsRepository.findOne(comment_id);
    if (!found) {
      throw new NotFoundException(`Comment ${comment_id} is not found`);
    }
    return found;
  }

  async deleteComments(comment_id: number) {
    const found = await this.getCommentsById(comment_id);
    if (!found) {
      throw new NotFoundException(`Comment ${comment_id} is not found`);
    }
    return await this.commentsRepository.delete(comment_id);
  }
}
