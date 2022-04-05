import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Product } from 'src/app/product/models/product';
import { UnitData } from 'src/app/product/models/unit-data';
import { CartItem } from '../models/cartItem';
import { CART_PRODUCTS } from './mock.cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Product[] = [];
  unitData!: UnitData;

  getCart(): Observable<CartItem[]> {
    return of(CART_PRODUCTS);
  }

  updateCart(product: Product, selectedUnit: number, quantity: number) {
    //FIXME - Check for availability of the product/unit in the cart
    //FIXME - If the combination item is found add/subract quantity (CartItem)
    //FIXME - If the count is zero now remove the item from cart
    //FIXME - if the count is greater than zero update the item back in cart
    //FIXME - If the combination item is not there in the cart create a new CartItem object and add it to the cart
    // this.items.push(product, selectedUnit, quantity);
    // localStorage.setItem('cart', JSON.stringify(this.items));
    //FIXME - Method to add or update an item into the cart
  }

  removeCart(product: Product, selectedUnit: number, quantity: number) {
    // this.items.push(product, selectedUnit, quantity);
    localStorage.removeItem('key');
  }

  getCartItems() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.items = JSON.parse(localStorage.getItem('cart') || '');
    return this.items;
  }
}
