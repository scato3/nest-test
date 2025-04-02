import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { User } from '../types/user.types';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private connection: Pool,
  ) {}

  async findAll(): Promise<Partial<User>[]> {
    const [rows] = await this.connection.query('SELECT id, email, name, role FROM users');
    return rows as Partial<User>[];
  }

  async findById(id: number): Promise<User | undefined> {
    const [rows] = await this.connection.query('SELECT * FROM users WHERE id = ?', [id]);

    const users = rows as User[];
    return users.length ? users[0] : undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const [rows] = await this.connection.query('SELECT * FROM users WHERE email = ?', [email]);

    const users = rows as User[];
    return users.length ? users[0] : undefined;
  }

  async create(userData: Partial<User>): Promise<User> {
    const { email, password, name, role } = userData;

    const [result] = await this.connection.query(
      'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
      [email, password, name, role],
    );

    const id = result.insertId;
    return { id, email, password, name, role } as User;
  }
}
