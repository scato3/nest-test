import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../types/user.types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<Partial<User>[]> {
    return this.usersService.getAll();
  }

  // JWT 인증이 필요한 라우트
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: User }) {
    // JWT를 통해 인증된 사용자 정보는 req.user에 담겨 있음
    return req.user;
  }
}
