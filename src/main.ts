import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Kombat JRPG')
    .setDescription(
      'Servicio para analizar el combate entre dos personajes que se enfrentan a muerte. Cada personaje cuenta con movimientos y 2 golpes especiales que infringen daño a su oponente.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/documentation', app, document);

  await app.listen(process.env.PORT);

  console.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
