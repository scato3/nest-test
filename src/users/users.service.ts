import { Injectable } from '@nestjs/common';
import { User, UserRole } from '../types/user.types';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getAll(): Promise<Partial<User>[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findByEmail(email);
  }

  async create(userData: Partial<User>): Promise<User> {
    // 역할이 지정되지 않은 경우 기본값으로 USER 설정
    if (!userData.role) {
      userData.role = UserRole.USER;
    }

    return this.usersRepository.create(userData);
  }
}
