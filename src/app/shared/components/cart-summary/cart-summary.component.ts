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
userId!:string;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.cartService.getCartItems(this.userId).subscribe((cartItems) => (this.items = cartItems));

  }
}
