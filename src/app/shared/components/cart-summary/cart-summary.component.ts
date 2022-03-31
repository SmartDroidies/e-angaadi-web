import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product/models/product';
import { Cart } from '../../models/cart';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  items: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.items = this.cartService.getCartItems();
  }
}
