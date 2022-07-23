import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  cartTotal = 0;
  badgeHidden!: boolean;
  signedIn = false;
  userId!: string;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItem();
  }

  getCartItem(): void {
    this.items = this.cartService.getCart();
  }

  async onCart() {
    this.badgeHidden = true;
    await this.router.navigate(['/cart']);
  }

  getCartTotal() {
    let cartTotal = 0;
    if (this.items.length) {
      this.items.forEach((items) => {
        cartTotal += items.price;
      });
    }
    return cartTotal;
  }

  getTotalQuantity() {
    let totalQuantity = 0;
    if (this.items.length) {
      this.items.forEach((items) => {
        totalQuantity += items.quantity;
      });
    }
    return totalQuantity;
  }
}
