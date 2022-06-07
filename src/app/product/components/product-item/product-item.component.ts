import { Component, Input, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { TranslateService } from '@ngx-translate/core';
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
  

  constructor(private cartService: CartService, private toastr: ToastrService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadProductsFromCart();
    this.productImage(this.product);
  }

  productImage(product:Product){
    let productImageUrl ="https://shopper-image.s3.ap-south-1.amazonaws.com/" +product.code +".png";
    return productImageUrl;
  }

  loadProductsFromCart() {
    this.cartProductItems = this.cartService.getCartProductItems(this.product.code);
    if (this.selectedUnit) {
      this.loadProductUnitFromCart(this.selectedUnit);
    }
  }

  getCartItemQuantity(currUnit: number) {
    const allItems = this.cartService.getCartItems();
    let qtyInCart = 0;
    allItems.forEach((item) => {
      if (item.unit == currUnit) {
        qtyInCart = item.quantity;
      }
    });
    return qtyInCart;
  }

  selectChip(item: MatChip, unit: number) {
    item.selected = !item.selected;
    this.selectedUnit = unit;
    this.loadProductUnitFromCart(unit);
  }

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
    } else {
      this.toastr.warning('Select unit before adding', 'Error');
    }
  }

  removeFromCart(product: Product) {
    if (this.selectedUnit) {
      this.cartService.updateCart(product, this.selectedUnit, -1);
      this.loadProductsFromCart();
    }
  }

  isInCart() {
    const cartProductUnitItem = this.cartProductItems.find((item) => item.unit === this.selectedUnit);
    return cartProductUnitItem != null && cartProductUnitItem.quantity > 0 ? true : false;
  }

  isProductUnitInCart(unit: number) {
    const cartProductUnitItem = this.cartProductItems.find((item) => item.unit === unit);
    return cartProductUnitItem != null ? true : false;
  }

  selectedProductUnitQuantity() {
    return this.cartProductItem ? this.cartProductItem.quantity : 0;
  }
}
