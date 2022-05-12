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
  selectedUnit!: number;
  cartProductItems!: CartItem[];
  cartProductItem: CartItem | undefined;
  items: CartItem[] = [];
  constructor(private productService: ProductService, private cartService: CartService) {}
  displayedColumns: string[] = ['title', 'price', 'quantity', 'total'];
  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.items = this.cartService.getCartItems();
  }

  loadProductsFromCart() {
    this.cartProductItems = this.cartService.getCartProductItems(this.product.code);
    if (this.selectedUnit) {
      this.loadProductUnitFromCart(this.selectedUnit);
    }
  }

  // getCartItemQuantity(currUnit: number) {
  //   const allItems = this.cartService.getCartItems();
  //   let qtyInCart = 0;
  //   allItems.forEach((item) => {
  //     if (item.unit == currUnit) {
  //       qtyInCart = item.quantity;
  //     }
  //   });
  //   return qtyInCart;
  // }

  loadProductUnitFromCart(unit: number) {
    this.cartProductItem = this.cartProductItems.find((item) => item.unit === unit);
  }

  addUnit() {
    this.addToCart(this.product);
  }

  subUnit() {
    this.removeFromCart(this.product);
  }

  addToCart(product: Product) {
    if (this.selectedUnit) {
      this.cartService.updateCart(product, this.selectedUnit, +1);
      this.loadProductsFromCart();
    }
  }

  removeFromCart(product: Product) {
    if (this.selectedUnit) {
      this.cartService.updateCart(product, this.selectedUnit, -1);
      this.loadProductsFromCart();
    }
  }
}
