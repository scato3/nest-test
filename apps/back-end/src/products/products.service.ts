import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  getAll(): string {
    return 'This action returns all products';
  }

  getBye(): string {
    return 'Bye from products service!';
  }
}
