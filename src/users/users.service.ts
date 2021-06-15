import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UsersCredentailDto } from './dto/users-credential-dto';
// import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  signUp(usersCredentailDto: UsersCredentailDto) {
    return this.usersRepository.createUsers(usersCredentailDto);
  }
}
