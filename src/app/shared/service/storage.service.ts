import { CartItem } from 'src/app/shared/models/cartItem';
import { Injectable } from '@angular/core';
import { CartBadgeService } from '../components/cart/cart-badge.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private cartBadgeService: CartBadgeService) {}

  C_USER_CART = 'user_cart';

  getUserCartItems(): CartItem[] {
    const cartItems = localStorage.getItem(this.C_USER_CART);
    if (cartItems) {
      return JSON.parse(cartItems) as CartItem[];
    } else {
      return [];
    }
  }

  updateUserCart(userCart: CartItem[] ) {
    localStorage.setItem(this.C_USER_CART, JSON.stringify(userCart));
    this.cartBadgeService.reload();
  } 

  deleteUserCart(){
    localStorage.removeItem(this.C_USER_CART);
    this.cartBadgeService.reload();
  }
}
