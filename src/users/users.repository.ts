import { Repository, EntityRepository } from 'typeorm';
import { Users } from './users.entity';
import { UsersCredentailDto } from './dto/users-credential-dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async createUsers(usersCredentailDto: UsersCredentailDto) {
    const { username, password } = usersCredentailDto;

    const users = new Users();
    users.username = username;
    users.password = password;
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
}
