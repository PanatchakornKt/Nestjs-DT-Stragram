import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersCredentailDto } from './dto/users-credential-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUsername } from './get-username-decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/admin/:id')
  getUsersById(@Param() id: number) {
    return this.usersService.getUsersById(id);
  }

  @Get('/login/posts/:id')
  getUsersPostsById(@Param() id: number) {
    return this.usersService.getUsersPostsById(id);
  }

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

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@Req() req, @GetUsername() username) {
    return username;
  }
}
