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
  price!: number;
  userId!:string;

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
    this.cartService.getCartItems(this.userId).subscribe((cartItems) => (this.cartProductItems = cartItems));
    // let qtyInCart = 0;
      // if (item.unit == currUnit) {
      //   qtyInCart = item.quantity;
      // };
    // return qtyInCart;
  }

  selectChip(item: MatChip, unit: number,price:number) {
    item.selected = !item.selected;
    this.selectedUnit = unit;
    this.loadProductUnitFromCart(unit);
    this.preparePrice(price);
  }

  preparePrice(clickedUnitPrice: number) {
    this.price=clickedUnitPrice;
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
    this.cartService.addToCart(product).subscribe((cartItems) => (this.cartProductItems = cartItems));

  }

  removeFromCart(product: Product) {
    this.cartService.addToCart(product).subscribe((cartItems) => (this.cartProductItems = cartItems));

  }

  // isInCart() {
  //   const cartProductUnitItem = this.cartProductItems.find((item) => item.unit === this.selectedUnit);
  //   return cartProductUnitItem != null && cartProductUnitItem.quantity > 0 ? true : false;
  // }

  isProductUnitInCart(unit: number) {
    const cartProductUnitItem = this.cartProductItems.find((item) => item.unit === unit);
    return cartProductUnitItem != null ? true : false;
  }

  selectedProductUnitQuantity() {
    return this.cartProductItem ? this.cartProductItem.quantity : 0;
  }
}
