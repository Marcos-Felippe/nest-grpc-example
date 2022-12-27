import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';

interface ProductGrpcService {
  create(data: { name: string; price: number }): Promise<Product>;
  findOne(id: number): Promise<Product>;
}

@Controller('product-grpc-client')
export class ProductGrpcClientController implements OnModuleInit {
  private productGrpcService: ProductGrpcService;

  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productGrpcService =
      this.client.getService<ProductGrpcService>('ProductService');
  }

  @Post()
  async create(@Body() data: CreateProductDto) {
    try {
      return await this.productGrpcService.create(data);
    } catch (e) {
      throw new RpcException({ code: e.code, message: e.message });
    }
  }

  @Get(':id')
  async findOne(@Param() id: number) {
    try {
      return await this.productGrpcService.findOne(id);
    } catch (e) {
      throw new RpcException({ code: e.code, message: e.message });
    }
  }
}
