import { CartBadgeService } from './cart-badge.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../service/cart.service';
import { ProductImage } from 'src/app/product/models/product-image';
import { ProductImageService } from 'src/app/product/service/product-image.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  badgeHidden!: boolean;
  signedIn = false;
  userId!: string;
  cartImages!: ProductImage;
  emptyCart = false;

  constructor(private router: Router, private cartService: CartService, private translate: TranslateService, private cartBadgeService: CartBadgeService, private productImageService: ProductImageService) { }

  ngOnInit(): void {
    this.loadCartItem();
    this.cartBadgeService.change.subscribe(() => {
      this.loadCartItem();
    });
    this.zeroQuantity();
  }

  loadCartItem(): void {
    this.items = this.cartService.getCart();
  }

  async onCart() {
    this.badgeHidden = true;
    await this.router.navigate(['/cart']);
  }

  getCartTotal() {
    let cartTotal = 0;
    if (this.items.length) {
      this.items.forEach((items) => {
        cartTotal += items.price;
      });
    }
    return cartTotal;
  }

  getSubTotal(cartItem: CartItem) {
    let subTotal = 0;

    this.items.forEach((loopItem) => {
      if (loopItem.code === cartItem.code && loopItem.unit === cartItem.unit) {
        //FIXME - The price needs to be pulled from the service
        subTotal = cartItem.price * cartItem.quantity;
      }
    });
    return subTotal;
  }

  getTotal() {
    let total = 0;

    this.items.forEach((items) => {
      total += this.getSubTotal(items);
    });
    return total;
  }

  getTotalQuantity() {
    let totalQuantity = 0;
    if (this.items.length) {
      this.items.forEach((items) => {
        totalQuantity += items.quantity;
      });
    }
    return totalQuantity;
  }

  collectCartImages(item: CartItem) {
    this.cartImages = this.productImageService.getCartImages(item);
    return this.cartImages;
  }

  zeroQuantity() {
    if (this.items.length == 0) {
      this.emptyCart = false;
    } else {
      this.emptyCart = true;
    }
  }

}
