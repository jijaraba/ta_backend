import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
// import { AllExceptionFilter } from './common/filters/http-exception.filter';
// import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new AllExceptionFilter());
  // app.useGlobalInterceptors(new TimeoutInterceptor());
  // app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, authorization',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Tres Astronautas')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Authentication with tokens',
      },
      'bearerAuth',
    )
    .addSecurity('bearerAuth', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Authentication with tokens',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
