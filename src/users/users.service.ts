import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UsersCredentailDto } from './dto/users-credential-dto';
// import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  async getUsersById(user_id: number) {
    const found = await this.usersRepository.findOne(user_id);
    if (!found) {
      throw new NotFoundException(`User ${user_id} is not found`);
    }
    return found;
  }

  signUp(usersCredentailDto: UsersCredentailDto) {
    return this.usersRepository.createUsers(usersCredentailDto);
  }

  signIn(usersCredentailDto: UsersCredentailDto) {
    return this.usersRepository.verifyUserPassword(usersCredentailDto);
  }
}
