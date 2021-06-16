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
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}
  // @Get()
  // getComments() {
  //   return this.commentsService.getComments();
  // }

  @Get('/:comment_id')
  getCommentsById(@Param() comment_id: number) {
    return this.commentsService.getCommentsById(comment_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  addComments(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComments(createCommentDto);
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
