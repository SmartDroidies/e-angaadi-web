import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/service/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
})
export class CartDetailComponent {
  constructor(private cartService: CartService) {}
}
