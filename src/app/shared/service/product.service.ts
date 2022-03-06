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
      qty: 1,
    },
    {
      code: 'apple',
      title: 'apple',
      price: 200,
      group: 'fruit',
      qty: 1,
    },
    {
      code: 'mango',
      title: 'mango',
      price: 150,
      group: 'fruit',
      qty: 1,
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
