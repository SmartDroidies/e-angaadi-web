import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { CART_PRODUCTS } from './mock.cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  getCart(): Observable<Cart[]> {
    return of(CART_PRODUCTS);
  }
}
