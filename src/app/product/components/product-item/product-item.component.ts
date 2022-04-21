import { Component, Input, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/shared/models/cartItem';
import { CartService } from 'src/app/shared/service/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  selectedUnit!: number;
  cartProductItems!: CartItem[];
  cartProductItem: CartItem | undefined;

  constructor(private cartService: CartService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadProductsFromCart();
  }

  loadProductsFromCart() {
    this.cartProductItems = this.cartService.getCartProductItems(this.product.code);
    if (this.selectedUnit) {
      this.loadProductUnitFromCart();
    }
  }

  selectChip(item: MatChip) {
    item.selected = !item.selected;
  }

  unitSelected(unit: number) {
    this.selectedUnit = unit;
    this.loadProductUnitFromCart();
  }

  loadProductUnitFromCart() {
    this.cartProductItem = this.cartProductItems.find((item) => item.unit == this.selectedUnit);
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
    } else {
      () => {
        this.toastr.error('Select unit before adding', 'Error', {
          positionClass: 'toast-bottom-center',
        });
      };
    }
  }

  removeFromCart(product: Product) {
    if (this.selectedUnit) {
      this.cartService.updateCart(product, this.selectedUnit, -1);
      this.loadProductsFromCart();
    }
  }

  isInCart() {
    const cartProductUnitItem = this.cartProductItems.find((item) => (item.unit = this.selectedUnit));
    return cartProductUnitItem != null && cartProductUnitItem.quantity > 0 ? true : false;
  }

  selectedProductUnitQuantity() {
    return this.cartProductItem ? this.cartProductItem.quantity : 0;
  }
}
