import { Injectable } from '@nestjs/common';
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

  getComments() {
    return this.commentsRepository.find();
  }
}
