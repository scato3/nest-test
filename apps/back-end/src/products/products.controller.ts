import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(): string {
    return this.productsService.getAll();
  }

  @Get('bye')
  getBye(): string {
    return this.productsService.getBye();
  }
}
