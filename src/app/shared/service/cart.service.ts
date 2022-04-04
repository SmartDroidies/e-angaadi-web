import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Product } from 'src/app/product/models/product';
import { UnitData } from 'src/app/product/models/unit-data';
import { Cart } from '../models/cart';
import { CART_PRODUCTS } from './mock.cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Product[] = [];
  unitData!: UnitData;

  getCart(): Observable<Cart[]> {
    return of(CART_PRODUCTS);
  }

  updateCart(product: Product, selectedUnit: number, quantity: number) {
    // this.items.push(product, selectedUnit, quantity);
    // localStorage.setItem('cart', JSON.stringify(this.items));
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
