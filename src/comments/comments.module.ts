import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsRepository])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
