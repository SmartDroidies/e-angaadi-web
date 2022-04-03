import { Injectable, Input } from '@angular/core';
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

  updateCart(product: Product, selectedUnit: any, quantity: any) {
    console.log(quantity);
    this.items.push(product, selectedUnit, quantity);
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
  
}
