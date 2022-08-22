import { StorageService } from './storage.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/product/models/product';
import { CartItem } from '../models/cartItem';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  getCartItems(userId: string): Observable<CartItem[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<CartItem[]>(environment.orderBaseUrl + '/cart', { params: params });
    //FIXME - Update the response into local storage
  }

  updateCartItems(cartItem: CartItem[]): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(environment.orderBaseUrl + '/cart', cartItem);
  }

  updateCart(product: Product, selectedUnit: number, quantity: number, price: number) {
    const itemInCart = this.getCartItem(product.code, selectedUnit);
    if (itemInCart) {
      itemInCart.quantity = itemInCart.quantity + quantity;
      itemInCart.synced = false;
      // this.updateCartStorage(itemInCart);
      if (itemInCart.quantity == 0) {
        this.removeItemInCart(itemInCart);
      } else {
        this.updateCartStorage(itemInCart);
      }
    } else {
      this.updateCartStorage(this.toCartItem(product, selectedUnit, quantity, price));
    }
  }

  updateCartSaveStatus(itemInCart: CartItem, saveStatus: boolean) {
    itemInCart.saved = saveStatus;
    this.updateCartStorage(itemInCart);
    // this.items.forEach((loopItem)=>{
    //   if(loopItem.code === cartProduct.code && loopItem.unit === cartProduct.unit ){
    //     loopItem.saved=true;
    //     // this.items.push(loopItem);
    //     window.localStorage.setItem('user_cart', JSON.stringify(this.items))
    //   }
    // })
  }

  removeItemInCart(itemInCart: CartItem) {
    const userCart = this.storageService.getUserItems();
    const itemIndex = userCart.findIndex(
      (strCartItem) => strCartItem.code === itemInCart.code && strCartItem.unit === itemInCart.unit
    );
    if (itemIndex > -1) {
      userCart.splice(itemIndex, 1);
    }
    this.storageService.updateUserCart(userCart);
  }

  updateCartStorage(cartItem: CartItem) {
    const userCart = this.storageService.getUserItems();
    //Replace the existing item or push new entry
    //FIXME - Have to handle the remove condition
    const itemIndex = userCart.findIndex(
      (strCartItem) => strCartItem.code === cartItem.code && strCartItem.unit === cartItem.unit
    );
    if (itemIndex > -1) {
      userCart[itemIndex] = cartItem;
    } else {
      userCart.push(cartItem);
    }
    this.storageService.updateUserCart(userCart);
  }

  toCartItem(product: Product, selectedUnit: number, quantity: number, price: number): CartItem {
    const cartItem = new CartItem(
      product.code,
      selectedUnit,
      quantity,
      product.title,
      product.submetric,
      price,
      false,
      product.userId,
      product.key,
      product.group,
      false
    );
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

  
  // deleteCart():any{
  //   return this.storageService.deleteUserCart();
  // }
  deleteCart() {
    const userCart = this.storageService.getUserItems();
    const itemIndex = userCart.findIndex(
      (strCartItem) => strCartItem.saved === false
    );
    // if (itemIndex > -1) {
    //   userCart.splice(itemIndex, 1);
    // }
    this.storageService.updateUserCart(userCart);
  }


  getUserSavedItems(): CartItem[] {
    return this.storageService.getUserSavedItems();
  }
}
