import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { User, JwtPayload } from '../../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', // 실제 환경에서는 환경 변수로 관리해야 합니다
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다');
    }

    // 토큰의 역할 정보 검증 (선택 사항)
    if (user.role !== payload.role) {
      throw new UnauthorizedException('권한이 변경되었습니다. 다시 로그인하세요.');
    }

    return user;
  }
}
