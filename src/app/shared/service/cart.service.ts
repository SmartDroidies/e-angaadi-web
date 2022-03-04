import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  placeholder = [];
  cartItems = new BehaviorSubject([]);
  constructor() {
    const ls = this.getCart();
    if (ls) this.cartItems.next(ls);
  }

  addToCart(product: Product) {
    const ls = this.getCart();

    if (ls) {
      const newData = [...ls, product];
      localStorage.setItem('cart', JSON.stringify(newData));
      this.cartItems.next(this.getCart());
    } else {
      this.setCart(this.placeholder);
      this.cartItems.next(this.getCart());
    }
  }
  setCart(data: any) {
    localStorage.setItem('cart', JSON.stringify(data));
    this.cartItems.next(this.getCart());
  }
  getCart() {
    return JSON.parse(localStorage.getItem('cart') || '{}');
  }
  getItems() {
    return this.cartItems;
  }
}
