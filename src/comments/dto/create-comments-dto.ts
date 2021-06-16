import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @MaxLength(200, {
    message: 'the text is too long.',
  })
  comment_text: string;

  post_id: number;
}
