import { CartItem } from './../../../shared/models/cartItem';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';
import { Product } from 'src/app/product/models/product';
import { ProductService } from 'src/app/product/service/product.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
})
export class CartDetailComponent implements OnInit {
  @Input() product!: Product;
  items: CartItem[] = [];
  constructor(private productService: ProductService, private cartService: CartService) {}
  displayedColumns: string[] = ['title', 'unit', 'price', 'quantity', 'total'];
  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.items = this.cartService.getCartItems();
  }

  addUnit(product: Product, selectedUnit: number) {
    this.cartService.updateCart(product, selectedUnit, +1);
  }
  subUnit(product: Product, selectedUnit: number) {
    this.cartService.updateCart(product, selectedUnit, -1);
  }
}
