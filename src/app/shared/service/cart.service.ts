import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/product/models/product';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})


export class CartService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  // getCartItems(userId: string): Observable<CartItem[]> {
  //   let params = new HttpParams();
  //   params = params.append('userId', userId);
  //   return this.http.get<CartItem[]>(environment.orderBaseUrl + '/cart', { params: params });
  // }
  cartItems!:CartItem[]

  //FIXME - Handle the update 
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

  //FIXME - Handle the remove 
  removeItemInCart(itemInCart: CartItem) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].code == itemInCart.code) {
        this.cartItems.splice(i, 1);
        break;
      }
    }
  }

  addToCart(cartItem: CartItem) {
    const userCart = this.storageService.getUserCartItems();
    userCart.push(cartItem);
    this.storageService.updateUserCart(userCart);
  }

  toCartItem(product: Product, selectedUnit: number, quantity: number): CartItem {
    const cartItem = new CartItem(product.code, selectedUnit, quantity, product.title, product.submetric);
    return cartItem;
  }

  getCartItem(code: string, selectedUnit: number) {
    return this.storageService.getUserCartItems().find((item) => item.code == code && item.unit == selectedUnit);
  }


  getCartProductItems(code: string): CartItem[] {
    return this.storageService.getUserCartItems().filter((item) => item.code == code);
  }

  getCart(): CartItem[] {
    return this.storageService.getUserCartItems();
  }
}
