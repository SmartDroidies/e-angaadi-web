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
  items: Array<string> = [];

  getCart(): Observable<Cart[]> {
    return of(CART_PRODUCTS);
  }
  
  addToCart(product:any){
    this.items.push(product);
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
}
