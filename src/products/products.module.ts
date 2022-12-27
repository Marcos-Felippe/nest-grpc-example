import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductGrpcServerController } from './product-grpc-server/product-grpc-server.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProductGrpcClientController } from './product-grpc-client/product-grpc-client.controller';

@Module({
  imports: [
    // Criando um cliente grpc para uso
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '127.0.0.1:50051',
          package: 'product',
          protoPath: join(__dirname, 'proto/product.proto'),
        },
      },
    ]),
  ],
  controllers: [
    ProductsController,
    ProductGrpcServerController,
    ProductGrpcClientController,
  ],
  providers: [ProductsService],
})
export class ProductsModule {}
