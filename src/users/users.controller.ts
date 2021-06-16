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

  @Get('/admin/:user_id')
  getCommentsById(@Param() user_id: number) {
    return this.usersService.getUsersById(user_id);
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
    // console.log(req);
    return username;
  }
}
