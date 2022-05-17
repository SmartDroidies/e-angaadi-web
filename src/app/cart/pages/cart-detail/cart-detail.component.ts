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
  subtotal = 0;
  unitqty = 0;

  constructor(private cartService: CartService, private router: Router) {}
  displayedColumns: string[] = ['image', 'title', 'unit', 'price', 'quantity', 'total'];
  ngOnInit(): void {
    this.getCart();
    this.getTotal();
  }

  getCart(): void {
    this.items = this.cartService.getCartItems();
  }

  addUnit(product: Product, selectedUnit: number) {
    this.cartService.updateCart(product, selectedUnit, +1);
    this.getTotal();
  }
  subUnit(product: Product, selectedUnit: number) {
    this.cartService.updateCart(product, selectedUnit, -1);
    this.getTotal();
  }

  getTotal() {
    this.items.forEach((items) => {
      this.unitqty = items.quantity * items.unit;
      this.subtotal = 50 * this.unitqty;
    });
    return this.subtotal;
  }

  async onCart() {
    await this.router.navigate(['/cart']);
  }
}
