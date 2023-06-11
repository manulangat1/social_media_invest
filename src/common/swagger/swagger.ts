import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerDefinition = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Social media site')
    .setDescription('The api collection for the social media investment site')
    .setVersion('1.0')
    .addTag('sociall media site')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  return SwaggerModule.setup('api', app, document);
};
