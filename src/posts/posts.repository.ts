import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { Post, CreatePostDto, UpdatePostDto } from '../types/post.types';

@Injectable()
export class PostsRepository {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private connection: Pool,
  ) {}

  async findAll(): Promise<Post[]> {
    const [rows] = await this.connection.query(`
      SELECT p.*, u.name as author_name 
      FROM posts p
      JOIN users u ON p.author_id = u.id
    `);
    return rows as Post[];
  }

  async findById(id: number): Promise<Post | undefined> {
    const [rows] = await this.connection.query(
      `
      SELECT p.*, u.name as author_name 
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.id = ?
      `,
      [id],
    );

    const posts = rows as any[];
    if (posts.length === 0) return undefined;

    // authorId 속성이 없는 경우 author_id에서 매핑
    const post = posts[0];
    return {
      ...post,
      authorId: post.author_id, // author_id를 authorId로 명시적 매핑
    };
  }

  async findByAuthorId(authorId: number): Promise<Post[]> {
    const [rows] = await this.connection.query(
      `
      SELECT p.*, u.name as author_name 
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.author_id = ?
      `,
      [authorId],
    );

    return rows as Post[];
  }

  async create(authorId: number, createPostDto: CreatePostDto): Promise<Post> {
    const { title, content } = createPostDto;

    const [result] = await this.connection.query(
      'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)',
      [title, content, authorId],
    );

    const id = result.insertId;

    return {
      id,
      title,
      content,
      authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<boolean> {
    const updates: string[] = [];
    const values: any[] = [];

    if (updatePostDto.title !== undefined) {
      updates.push('title = ?');
      values.push(updatePostDto.title);
    }

    if (updatePostDto.content !== undefined) {
      updates.push('content = ?');
      values.push(updatePostDto.content);
    }

    if (updates.length === 0) {
      return true;
    }

    values.push(id);

    const [result] = await this.connection.query(
      `UPDATE posts SET ${updates.join(', ')} WHERE id = ?`,
      values,
    );

    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await this.connection.query('DELETE FROM posts WHERE id = ?', [id]);

    return result.affectedRows > 0;
  }
}
