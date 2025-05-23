import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { CsrfTokenMiddleware } from './guards/csrfToken';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use('/secure', CsrfTokenMiddleware);
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true, 
  });  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
