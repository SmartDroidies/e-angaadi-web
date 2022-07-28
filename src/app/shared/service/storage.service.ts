import { CartItem } from 'src/app/shared/models/cartItem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  C_USER_CART = 'user_cart';

  getUserCartItems(): CartItem[] {
    const cartItems = localStorage.getItem(this.C_USER_CART);
    if (cartItems) {
      return JSON.parse(cartItems);
    } else {
      return [];
    }
  }

  updateUserCart(userCart: CartItem[] ) {
    localStorage.setItem(this.C_USER_CART, JSON.stringify(userCart));
  } 
  
  // removeUserCartItems(): CartItem[] {
  //    localStorage.removeItem(this.C_USER_CART);
  //    return [];
  // }
}
