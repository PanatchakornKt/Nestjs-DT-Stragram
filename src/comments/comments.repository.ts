import { Comments } from './comments.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comments-dto';

@EntityRepository(Comments)
export class CommentsRepository extends Repository<Comments> {
  async createComments(createCommentDto: CreateCommentDto): Promise<Comments> {
    const { comment_text } = createCommentDto;
    const comments = new Comments();
    comments.comment_text = comment_text;
    await comments.save();

    return comments;
  }
}
