import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    const product = {
      id: 1,
      name: createProductDto.name,
      price: createProductDto.price,
    };

    return product;
  }

  findAll() {
    const products = [
      {
        id: 1,
        name: 'PC',
        price: 3000,
      },
      {
        id: 2,
        name: 'Smartphone',
        price: 2000,
      },
      {
        id: 3,
        name: 'PlayStation',
        price: 4000,
      },
    ];

    return products;
  }

  findOne(id: number) {
    const products = [
      {
        id: 1,
        name: 'PC',
        price: 3000,
      },
      {
        id: 2,
        name: 'Smartphone',
        price: 2000,
      },
      {
        id: 3,
        name: 'PlayStation',
        price: 4000,
      },
    ];

    return products[id - 1];
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
