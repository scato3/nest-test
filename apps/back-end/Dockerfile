FROM node:20-alpine

WORKDIR /app

# netcat과 pnpm 설치
RUN apk add --no-cache netcat-openbsd
RUN corepack enable && corepack prepare pnpm@8.9.0 --activate

# 앱 파일 복사
COPY package*.json ./
COPY . .

# 의존성 설치 및 빌드
RUN pnpm install
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"] 