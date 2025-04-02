import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성은 자동으로 제거
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 요청 자체를 거부
      transform: true, // 요청 데이터를 DTO 클래스의 인스턴스로 자동 변환
    }),
  );
  await app.listen(3000);
}
bootstrap().catch((err: Error) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
