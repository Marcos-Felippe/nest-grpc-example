import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '127.0.0.1:50051',
      package: 'product',
      protoPath: join(__dirname, 'products/proto/product.proto'),
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
