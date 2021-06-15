import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
// import { MulterModule } from '@nestjs/platform-express/multer';
// import { LoggerMiddleware } from './logger.middleware';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    PostsModule,
    CommentsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    // MulterModule.register[
    //   {
    //     dest: '/upload',
    //   }
    // ],
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes('posts');
  // }
}
