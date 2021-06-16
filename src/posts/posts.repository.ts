// import { Posts } from './posts.entity';
// import { Repository, EntityRepository } from 'typeorm';
// import { CreatePostsDto } from './dto/create-posts-dto';

// @EntityRepository(Posts)
// export class PostsRepository extends Repository<Posts> {
//   async createPosts(createPostsDto: CreatePostsDto): Promise<Posts> {
//     const { post_text } = createPostsDto;

//     const posts = new Posts();
//     posts.post_text = post_text;
//     await posts.save();
//     return posts;
//   }
// }
