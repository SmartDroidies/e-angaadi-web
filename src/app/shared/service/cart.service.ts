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
    const itemInCart = this.getCartItem(product.code, selectedUnit, quantity);
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
    const cartItem = new CartItem(product.code, selectedUnit, quantity);
    return cartItem;
  }

  getCartItem(code: string, selectedUnit: number, quantity: number) {
    return this.cartItems.find((item) => item.code == code && item.unit == selectedUnit);
  }

  removeCart(product: string) {
    localStorage.removeItem(product);
  }

  getCartProductItems(code: string): CartItem[] {
    return this.cartItems.filter((item) => item.code == code);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }
}

//FIXME - Check for availability of the product/unit in the cart
//FIXME - If the combination item is found add/subract quantity (CartItem)
//FIXME - If the count is zero now remove the item from cart
//FIXME - if the count is greater than zero update the item back in cart
//FIXME - If the combination item is not there in the cart create a new CartItem object and add it to the cart
