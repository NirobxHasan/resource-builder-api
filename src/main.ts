import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: true,
        credentials: true
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    // app.useGlobalInterceptors(new SuccessInterceptor());
    await app.listen(3000);
}
bootstrap();
