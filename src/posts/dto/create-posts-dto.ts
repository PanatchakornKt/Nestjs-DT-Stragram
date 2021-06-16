import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePostsDto {
  @IsNotEmpty()
  @MaxLength(1000, {
    message: 'the text is too long.',
  })
  post_text: string;

  user_id: number;
}
