import { CartItem } from './../../../shared/models/cartItem';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';
import { Product } from 'src/app/product/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
})
export class CartDetailComponent implements OnInit {
  @Input() product!: Product;
  items: CartItem[] = [];
  saved: any;
  show!: boolean;

  constructor(private cartService: CartService, private router: Router) { }
  displayedColumns1: string[] = ['title', 'quantity', 'total'];
  displayedColumns2: string[] = ['title', 'quantity', 'total'];
  ngOnInit(): void {
    this.getCart();
    this.showCart();
  }

  getCart(): void {
    this.items = this.cartService.getCartItems();
  }

  showCart() {
    if (this.items.length > 0) {
      this.show = true;
    }
    else {
      this.show = false;
    }
  }

  addUnit(product: Product, selectedUnit: number) {
    this.cartService.updateCart(product, selectedUnit, +1);
    // this.getTotal();
  }
  subUnit(product: Product, selectedUnit: number) {
    this.cartService.updateCart(product, selectedUnit, -1);
    // this.getTotal();
  }

  getSubTotal(cartItem: CartItem) {
    let subTotal = 0;
    this.items.forEach((loopItem) => {
      if (loopItem.code === cartItem.code && loopItem.unit === cartItem.unit) {
        //FIXME - The price needs to be pulled from the service
        subTotal = 50 * cartItem.quantity;
      }
    });
    return subTotal;
  }

  onSave() {

  }

  emptyCart() {
    return
  }

  getTotal() {
    let total = 0;
    this.items.forEach((items) => {
      total += this.getSubTotal(items);
    });
    return total;
  }


  async onShopping() {
    await this.router.navigate(['/home']);
  }

  getTotalQuantity() {
    let totalQuantity = 0;
    this.items.forEach((items) => {
      totalQuantity += items.quantity;
    });
    return totalQuantity;
  }
}
