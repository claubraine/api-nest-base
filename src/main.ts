import './configs/env.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'yaml';

const {
  TITLE,
  DESCRIPTION,
  API_ROUTES_PREFIX,
  URL_TEAM,
  CONTACT_NAME_DEV,
  CONTACT_EMAIL_DEV,
  SETPSWAGGER,
  PORT = '8081'
} = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription(
      DESCRIPTION,
    )
    .setVersion('1.0')
    .addServer(API_ROUTES_PREFIX)
    .setExternalDoc('Contacts Team', URL_TEAM)
    .setLicense('Info', URL_TEAM)
    .addServer('https')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  document.info.contact = Object.assign({
    name: CONTACT_NAME_DEV,
    email: CONTACT_EMAIL_DEV,
    url: URL_TEAM,
  });

  const yamlString: string = yaml.stringify(document, {});
  fs.writeFileSync('./swagger-spec.yaml', yamlString);
  SwaggerModule.setup(SETPSWAGGER, app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix(API_ROUTES_PREFIX);
  app.enableCors();
  await app.listen(PORT);

  Logger.debug(`Consent started on port ${PORT}`);
  Logger.debug(`Swagger ${PORT}/${SETPSWAGGER}`);
  Logger.debug(`Consent started in the ${process.env.ENVIRONMENT} environment`);
}
bootstrap();
