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
  qtyTotal = 0;
  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItem();
    this.getCartTotal();
    this.getTotalQty();
  }

  getCartItem(): void {
   this.items= this.cartService.getCartItems();
  }

  async onCart() {
    await this.router.navigate(['/cart']);
  }

  getCartTotal() {
    this.items.forEach((items) => {
      this.cartTotal += items.price;
    });
  }

  getTotalQty() {
    this.items.forEach((items) => {
     this.qtyTotal+=items.qty;
    });
  }
}
