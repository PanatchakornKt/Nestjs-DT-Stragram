import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePostsDto {
  @IsNotEmpty()
  @MaxLength(200, {
    message: 'the text is too long.',
  })
  post_text: string;
}
