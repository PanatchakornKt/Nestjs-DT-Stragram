import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UsersCredentailDto } from './dto/users-credential-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async getUsersById(id: number) {
    const found = await this.usersRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`User ${id} is not found`);
    }
    return found;
  }

  async getUsersPostsById(id: number) {
    console.log('test');
    const found = await this.usersRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`User ${id} is not found`);
    }
    return found;
    console.log(found);
  }

  signUp(usersCredentailDto: UsersCredentailDto) {
    return this.usersRepository.createUsers(usersCredentailDto);
  }

  async signIn(usersCredentailDto: UsersCredentailDto) {
    const username = await this.usersRepository.verifyUserPassword(
      usersCredentailDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { username };
    const token = await this.jwtService.sign(payload);
    return { token };
  }
}
