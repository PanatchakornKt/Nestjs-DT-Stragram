import { Repository, EntityRepository } from 'typeorm';
import { Users } from './users.entity';
import { UsersCredentailDto } from './dto/users-credential-dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async createUsers(usersCredentailDto: UsersCredentailDto) {
    const { username, password } = usersCredentailDto;
    const salt = bcrypt.genSaltSync();

    const users = new Users();
    users.username = username;
    users.salt = salt;
    users.password = await this.hushPassword(password, salt);

    try {
      await users.save();
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException(
          'Error, Because this username already exist',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
    return users;
  }

  async verifyUserPassword(usersCredentailDto: UsersCredentailDto) {
    const { username, password } = usersCredentailDto;
    const user = await this.findOne({ username: username });
    if (user && (await user.verifyPassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  async hushPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
