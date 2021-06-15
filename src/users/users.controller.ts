import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersCredentailDto } from './dto/users-credential-dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() usersCredentailDto: UsersCredentailDto) {
    console.log(usersCredentailDto);
    return this.usersService.signUp(usersCredentailDto);
  }

  @Post('/signin')
  signIn(@Body() usersCredentailDto: UsersCredentailDto) {
    console.log(usersCredentailDto);
    return this.usersService.signIn(usersCredentailDto);
  }
}
