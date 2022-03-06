import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cartdetail',
  templateUrl: './cartdetail.component.html',
  styleUrls: ['./cartdetail.component.scss'],
})
export class CartdetailComponent implements OnInit {
  items = this.cartService.getCart();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // this.cartService.loadCart();

    console.log(this.items);
  }
}
