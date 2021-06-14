import { Posts } from './posts.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {}
