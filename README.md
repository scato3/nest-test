# NestJS Demo with Turborepo

<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  <h2>NestJS 연습 프로젝트</h2>
</div>

## 🚀 프로젝트 소개

이 프로젝트는 NestJS와 Turborepo를 활용한 연습용 프로젝트입니다. Docker를 통해 백엔드 서비스를 실행하며, 모노레포 구조로 구성되어 있습니다.

## 🛠 기술 스택

- **Backend**: NestJS
- **Package Manager**: pnpm
- **Monorepo Tool**: Turborepo
- **Container**: Docker
- **Language**: TypeScript

## 🏗 프로젝트 구조

```
nest-demo-turbo/
├── apps/                # 애플리케이션 디렉토리
├── packages/            # 공유 패키지 디렉토리
├── docker-compose.yml   # Docker 구성 파일
└── package.json        # 프로젝트 설정 파일
```

## 🚦 시작하기

### 사전 요구사항

- Node.js 16 이상
- pnpm
- Docker & Docker Compose

### 설치

```bash
# 패키지 설치
pnpm install
```

### 개발 서버 실행

```bash
# 개발 모드로 실행
pnpm dev

# Docker로 백엔드 실행
docker-compose up
```
