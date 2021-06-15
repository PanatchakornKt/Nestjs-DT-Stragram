//import { Comments } from './comments.entity';
import {
  Controller,
  Get,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comments-dto';
// import { CommentsRepository } from './comments.repository';
// import { InjectRepository } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  //   constructor(
  //     @InjectRepository(CommentsRepository)
  //     private commentsRepository: CommentsRepository,
  //   ) {}
  constructor(private commentsService: CommentsService) {}
  @Get()
  getComments() {
    // return this.commentsRepository.find();
    return this.commentsService.getComments();
  }

  //   @Post()
  //   addComments(@Body('comment_text') comment_text: string) {
  //     console.log(`${comment_text}`);
  //   }

  @Post()
  @UsePipes(ValidationPipe)
  addComments(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComments(createCommentDto);
  }

  @Get('/:comment_id')
  getCommentsById(@Param() comment_id: number) {
    return this.commentsService.getCommentsById(comment_id);
  }

  @Delete('/:comment_id')
  deleteCommentsById(@Param() comment_id: number) {
    return this.commentsService.deleteComments(comment_id);
  }

  @Patch('/:comment_id')
  async updateCommentsById(
    @Param() comment_id: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const comment = await this.getCommentsById(comment_id);
    const { comment_text } = createCommentDto;
    comment.comment_text = comment_text;
    await comment.save();
    return comment;
  }
}
