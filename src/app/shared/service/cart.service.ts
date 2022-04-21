import { Injectable } from '@angular/core';
import { Product } from 'src/app/product/models/product';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})

export class CartService {

  cartItems: CartItem[] = [];

  updateCart(product: Product, selectedUnit: number, quantity: number) {
    const itemInCart = this.getCartItem(product.code, selectedUnit);
    if (itemInCart) {
      itemInCart.quantity = itemInCart.quantity + quantity;
      if (itemInCart.quantity == 0) {
        this.removeItemInCart(itemInCart);
      }
    } else {
      this.addToCart(this.toCartItem(product, selectedUnit, quantity));
    }
  }

  removeItemInCart(itemInCart: CartItem) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].code == itemInCart.code) {
        this.cartItems.splice(i, 1);
        break;
      }
    }
  }

  addToCart(cartItem: CartItem) {
    this.cartItems.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  toCartItem(product: Product, selectedUnit: number, quantity: number): CartItem {
    const cartItem = new CartItem(product.code, selectedUnit, quantity, product.title, product.submetric);
    return cartItem;
  }

  getCartItem(code: string, selectedUnit: number) {
    return this.cartItems.find((item) => item.code == code && item.unit == selectedUnit);
  }


  getCartProductItems(code: string): CartItem[] {
    return this.cartItems.filter((item) => item.code == code);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }
}
