import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { CartService } from '../../../shared/service/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
})
export class CartDetailComponent implements OnInit {
  items = this.cartService.getCart();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // this.cartService.loadCart();

    console.log(this.items);
  }
}
