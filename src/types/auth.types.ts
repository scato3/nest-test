import { UserRole } from './user.types';

export interface JwtPayload {
  sub: number;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: UserRole;
  };
}

export interface RegisterResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: UserRole;
  };
}
