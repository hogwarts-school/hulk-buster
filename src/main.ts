import { AppConfigService } from '@app-config/service/app-config.service';
import { HttpExceptionFilter } from '@common/filter/http-exception.filter';
import { PostInterceptor } from '@common/interceptor/post.interceptor';
import { TransformInterceptor } from '@common/interceptor/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfigService = app.get(AppConfigService);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new PostInterceptor(), new TransformInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix(appConfigService.apiConfig.prefix);

  const options = new DocumentBuilder()
    .setTitle('Hulk Buster example')
    .setDescription('The hulk buster API description')
    .setVersion('1.0')
    .addTag('lalalala')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(appConfigService.apiConfig.port);
}
bootstrap();
