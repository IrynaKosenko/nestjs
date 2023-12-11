import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/HttpException.filter';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // for using filters globally
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // for swagger
  const config = new DocumentBuilder()
    .setTitle('Starwars')
    .setDescription('The Starwars API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // for using in-build pipes globally
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  //for using .env variables
  const configServise = app.get(ConfigService);
  const port = configServise.getOrThrow<number>('APP_PORT');

  // this is method from class-validator and needs for proper operation custom validation
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port, () => {
    console.log(`Listening at ${port}`);
  });
}
bootstrap();
