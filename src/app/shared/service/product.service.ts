import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [
    {
      code: 'pluse',
      title: 'pluse',
      price: 100,
      group: 'spices',
    },
    {
      code: 'apple',
      title: 'apple',
      price: 200,
      group: 'fruit',
    },
    {
      code: 'mango',
      title: 'mango',
      price: 150,
      group: 'fruit',
    },
  ];
  constructor() {}

  getproducts() {
    return this.products;
  }

  getproduct(code: string) {
    return this.products.find((product) => product.code === code);
  }
}
