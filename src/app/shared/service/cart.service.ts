import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Product } from 'src/app/product/models/product';
import { CartItem } from '../models/cartItem';
import { CART_PRODUCTS } from './mock.cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  getCart(): Observable<CartItem[]> {
    return of(CART_PRODUCTS);
  }

  updateCart(product: Product, selectedUnit: number, quantity: number) {
    const itemInCart = this.getCartItem(product.code, selectedUnit);
    if (itemInCart) {
      itemInCart.quantity = itemInCart.quantity + quantity;
    } else {
      this.addToCart(this.toCartItem(product, selectedUnit, quantity));
    }
  }

  addToCart(cartItem: CartItem) {
    if (cartItem.quantity == 0) {
      this.removeCart(cartItem.code);
    } else {
      this.cartItems.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }

  toCartItem(product: Product, selectedUnit: number, quantity: number): CartItem {
    const cartItem = new CartItem(product.code, selectedUnit, quantity, product.title, product.submetric);
    return cartItem;
  }

  getCartItem(code: string, selectedUnit: number) {
    return this.cartItems.find((item) => item.code == code && item.unit == selectedUnit);
  }

  removeCart(code: string) {
    localStorage.removeItem(code);
  }

  getCartProductItems(code: string): CartItem[] {
    return this.cartItems.filter((item) => item.code == code);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }
}