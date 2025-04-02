import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { Post, CreatePostDto, UpdatePostDto } from '../types/post.types';
import { User, UserRole } from '../types/user.types';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  async findAll(): Promise<Post[]> {
    return this.postsRepository.findAll();
  }

  async findById(id: number): Promise<Post> {
    const post = await this.postsRepository.findById(id);
    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다');
    }
    return post;
  }

  async findByAuthorId(authorId: number): Promise<Post[]> {
    return this.postsRepository.findByAuthorId(authorId);
  }

  async create(user: User, createPostDto: CreatePostDto): Promise<Post> {
    return this.postsRepository.create(user.id, createPostDto);
  }

  async update(id: number, user: User, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findById(id);

    // 디버깅 로그 추가
    console.log('권한 디버깅 정보:', {
      userId: user.id,
      userIdType: typeof user.id,
      userRole: user.role,
      postAuthorId: post.authorId,
      postAuthorIdType: typeof post.authorId,
      condition: !(user.role === UserRole.ADMIN || post.authorId === user.id),
    });

    // 관리자이거나 작성자인 경우에만 수정 가능
    if (!(user.role === UserRole.ADMIN || post.authorId === user.id)) {
      throw new ForbiddenException('게시글을 수정할 권한이 없습니다');
    }

    const success = await this.postsRepository.update(id, updatePostDto);
    if (!success) {
      throw new NotFoundException('게시글을 수정할 수 없습니다');
    }

    return this.findById(id);
  }

  async delete(id: number, user: User): Promise<boolean> {
    const post = await this.findById(id);

    // 디버깅 로그 추가
    console.log('권한 디버깅 정보:', {
      userId: user.id,
      userIdType: typeof user.id,
      userRole: user.role,
      postAuthorId: post.authorId,
      postAuthorIdType: typeof post.authorId,
      condition: !(user.role === UserRole.ADMIN || post.authorId === user.id),
    });

    // 관리자이거나 작성자인 경우에만 삭제 가능
    if (!(user.role === UserRole.ADMIN || post.authorId === user.id)) {
      throw new ForbiddenException('게시글을 삭제할 권한이 없습니다');
    }

    const success = await this.postsRepository.delete(id);
    if (!success) {
      throw new NotFoundException('게시글을 삭제할 수 없습니다');
    }

    return true;
  }
}
