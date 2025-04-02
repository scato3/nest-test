import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../types";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      "roles",
      context.getHandler()
    );

    // 역할 체크가 필요 없는 경우
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // 사용자 정보가 없는 경우
    if (!user) {
      throw new ForbiddenException("로그인이 필요합니다");
    }

    // 사용자의 역할이 요구되는 역할 중 하나라도 포함되어 있는지 확인
    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      throw new ForbiddenException("접근 권한이 없습니다");
    }

    return true;
  }
}
