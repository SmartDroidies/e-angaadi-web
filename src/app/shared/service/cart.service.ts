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
    let itemInCart = this.getCartItem(product.code, selectedUnit);
    if (itemInCart) {
      this.addToCart(this.toCartItem(itemInCart.product,itemInCart.selectedUnit,itemInCart.quantity));
    } else{
      this.addToCart(this.toCartItem(product, selectedUnit, quantity));
    }
    //FIXME - Check for availability of the product/unit in the cart
    //FIXME - If the combination item is found add/subract quantity (CartItem)
    //FIXME - If the count is zero now remove the item from cart
    //FIXME - if the count is greater than zero update the item back in cart
    //FIXME - If the combination item is not there in the cart create a new CartItem object and add it to the cart
    //FIXME - Method to add or update an item into the cart
  }

  addToCart(cartItem: any) {
    cartItem.push(this.cartItems);
    localStorage.setItem('cart', JSON.stringify(cartItem));
  }

  toCartItem(product: Product, selectedUnit: number, quantity: number): any {
    let cartItem = new CartItem();
    cartItem.unit = selectedUnit;
    cartItem.qty = quantity;
    cartItem.code = product.code;
    return cartItem;
  }


  getCartItem(code: string, selectedUnit: number) {
    let cartItem = JSON.parse(localStorage.getItem('cart') || '');
    if (cartItem.code == code && cartItem.unit == selectedUnit) {
      return cartItem;
    }
  }

  removeCart(product: Product, selectedUnit: number, quantity: number) {
    // this.items.push(product, selectedUnit, quantity);
    localStorage.removeItem('key');
  }

  getCartItems() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let items = JSON.parse(localStorage.getItem('cart') || '');
    return items
  }
}
