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
  items: Product[] = [];
  constructor() { }

  addToCart(product: Product) {
    // const ls = this.getCart();

    // if (ls) {
    //   const newData = [...ls, product];
    //   localStorage.setItem('cart', JSON.stringify(newData));
    //   this.cartItems.next(this.getCart());
    // } else {
    //   this.setCart(this.placeholder);
    //   this.cartItems.next(this.getCart());
    // }
    const result = this.items.push(product);
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
  // setCart() {

  //   this.cartItems.next(this.getCart());
  // }
  getCart() {
    //FIXME - Return the json here and display the screen  
    // 5 Products (Image Url, Description, Unit,  Quantity, Price)
    return JSON.parse(localStorage.getItem('cart') || '{}');
  }

  getItems() {
    return this.items;
  }

}
