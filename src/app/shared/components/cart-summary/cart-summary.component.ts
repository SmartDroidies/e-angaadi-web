import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  Items: Cart[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItem();
  }

  getCartItem(): void {
    this.cartService.getCart().subscribe((products) => (this.Items = products));
  }
}
