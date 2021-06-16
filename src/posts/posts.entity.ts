import { Users } from '../users/users.entity';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'posts' })
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  userId: number;

  @ManyToOne((type) => Users, (user) => user.posts, { eager: false })
  user: Users;

  @Column()
  post_text: string;

  @Column({ default: 'noImage.jpeg' })
  post_img: string;

  @UpdateDateColumn()
  post_updated: Date;
}
