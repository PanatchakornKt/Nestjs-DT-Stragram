import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column()
  user_id: number;

  @Column()
  post_text: string;

  @Column({ default: 'noImage.jpeg' })
  post_img: string;

  @UpdateDateColumn()
  post_updated: Date;
}
