import { CartItem } from 'src/app/shared/models/cartItem';
import { Injectable } from '@angular/core';
import { CartBadgeService } from '../components/cart/cart-badge.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private cartBadgeService: CartBadgeService) {}

  C_USER_CART = 'user_cart';

  getUserItems():CartItem[]{
    const cartItems = localStorage.getItem(this.C_USER_CART);
    if (cartItems) {
      return (JSON.parse(cartItems) as CartItem[]);
    } else {
      return [];
    }}

  getUserCartItems(): CartItem[] {
    const cartItems = localStorage.getItem(this.C_USER_CART);
    if (cartItems) {
      return (JSON.parse(cartItems) as CartItem[]).filter((item) => item.saved === undefined || item.saved == false);
    } else {
      return [];
    }
  }

  getUserSavedItems(): CartItem[] {
    const cartItems = localStorage.getItem(this.C_USER_CART);
    if (cartItems) {
      return (JSON.parse(cartItems) as CartItem[]).filter((item) => item.saved === true);
    } else {
      return [];
    }
  }

  updateUserCart(userCart: CartItem[]) {
    localStorage.setItem(this.C_USER_CART, JSON.stringify(userCart));
    this.cartBadgeService.reload();
  }
}
