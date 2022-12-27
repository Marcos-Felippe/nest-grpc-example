import { Controller, HttpStatus } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from '../products.service';
// import { Product } from '../entities/product.entity';
// import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller()
export class ProductGrpcServerController {
  constructor(private productsService: ProductsService) {}

  @GrpcMethod('ProductService', 'Create')
  create(
    data: CreateProductDto,
    // metadata: Metadata,
    // call: ServerUnaryCall<CreateProductDto, Product>,
  ) {
    //console.log(data, metadata, call);

    return this.productsService.create(data);
  }

  @GrpcMethod('ProductService', 'FindOne')
  findOne(data: { id: number }) {
    const { id } = data;
    return this.productsService.findOne(id);
  }

  @GrpcMethod('ProductService')
  async findAll() {
    const products = await this.productsService.findAll();
    return { data: products };
  }

  @GrpcMethod('ProductService')
  update(
    data: { id: number; name: string; price: number },
    //metadata: Metadata,
    //call: ServerUnaryCall<UpdateProductDto, Product>,
  ) {
    //console.log(data, metadata, call);
    const { id, ...rest } = data;
    return this.productsService.update(id, rest);
  }

  @GrpcMethod('ProductService', 'Delete')
  async remove(data: { id: number }) {
    const { id } = data;

    try {
      return await this.productsService.remove(id);
    } catch (e) {
      throw new RpcException({
        message: 'Product not found',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
