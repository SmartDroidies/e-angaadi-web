import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product/models/product';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
})
export class CartDetailComponent implements OnInit {
  items: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.items = this.cartService.getCartItems();
  }
}
