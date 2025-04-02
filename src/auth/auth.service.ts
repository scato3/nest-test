import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User, LoginDto } from '../types';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);

    // 실제 구현에서는 bcrypt.compare 등으로 비밀번호를 안전하게 비교해야 합니다
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('로그인 정보가 올바르지 않습니다');
    }

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(registerDto: RegisterDto) {
    const { email } = registerDto;
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다');
    }

    // 실제 구현에서는 비밀번호를 bcrypt로 해시해야 합니다
    const newUser = await this.usersService.create(registerDto);

    // 비밀번호를 제외한 사용자 정보 반환
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;

    const payload = {
      email: newUser.email,
      sub: newUser.id,
      role: newUser.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }
}
