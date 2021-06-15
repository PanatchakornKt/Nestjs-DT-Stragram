import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
@Unique(['username'])
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async verifyPassword(password) {
    const hashPassword = await bcrypt.hash(password, this.salt);
    return this.password === hashPassword;
  }
}
