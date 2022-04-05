import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  items: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItem();
  }

  getCartItem(): void {
    this.cartService.getCart().subscribe((products) => (this.items = products));
  }
}
