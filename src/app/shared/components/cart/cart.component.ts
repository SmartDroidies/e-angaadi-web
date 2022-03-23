import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../../models/cart';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items: Cart[] = [];
  cartTotal = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItem();
    this.getCartTotal();
  }

  getCartItem(): void {
    this.cartService.getCart().subscribe((products) => (this.items = products));
  }

  async onCart() {
    await this.router.navigate(['/cart']);
  }

  getCartTotal() {
    this.items.forEach((item) => {
      this.cartTotal += item.price;
    });
  }
}

//FIXME - Barani use Mat Dialog
//FIXME - Barani use Mat List
