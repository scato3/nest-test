import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreatePostDto, UpdatePostDto } from '../types/post.types';
import { User, UserRole } from '../types/user.types';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findById(id);
  }

  // 로그인한 사용자만 게시글을 작성할 수 있음
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createPostDto: CreatePostDto) {
    const user = req.user as User;
    return this.postsService.create(user, createPostDto);
  }

  // 로그인한 사용자만 게시글을 수정할 수 있음 (작성자 또는 관리자)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const user = req.user as User;
    return this.postsService.update(id, user, updatePostDto);
  }

  // 로그인한 사용자만 게시글을 삭제할 수 있음 (작성자 또는 관리자)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const user = req.user as User;
    return this.postsService.delete(id, user);
  }

  // 관리자 전용 API
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/all')
  adminFindAll() {
    return this.postsService.findAll();
  }
}
