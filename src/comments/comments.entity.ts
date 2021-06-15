import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column()
  comment_text: string;

  @UpdateDateColumn()
  comment_updated: Date;
}
