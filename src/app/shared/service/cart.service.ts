import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Product } from 'src/app/product/models/product';
import { Cart } from '../models/cart';
import { CART_PRODUCTS } from './mock.cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Product[] = [];

  getCart(): Observable<Cart[]> {
    return of(CART_PRODUCTS);
  }

  updateCart(product: Product, selectedUnit: any, unitBatch: any) {
    console.log(unitBatch);
    this.items.push(product, selectedUnit, unitBatch);
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
  
}
