import { Component, OnInit } from '@angular/core';
import { ProductImage } from 'src/app/product/models/product-image';
import { ProductImageService } from 'src/app/product/service/product-image.service';
import { CartBadgeService } from 'src/app/shared/components/cart/cart-badge.service';
import { CartItem } from 'src/app/shared/models/cartItem';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-save-later',
  templateUrl: './save-later.component.html',
  styleUrls: ['./save-later.component.scss'],
})
export class SaveLaterComponent implements OnInit {
  items: CartItem[] = [];
  cartImages!: ProductImage;

  constructor(
    private cartService: CartService,
    private productImageService: ProductImageService,
    private cartBadgeService: CartBadgeService
  ) {}

  ngOnInit(): void {
    this.getSaved();
    this.cartBadgeService.change.subscribe(() => {
      this.getSaved();
    });
  }

  getSaved() {
    this.items = this.cartService.getUserSavedItems();
  }

  onAdd(cartItem: CartItem) {
    this.cartService.updateCartSaveStatus(cartItem, false);
    this.getSaved();
  }

  collectCartImages(item: CartItem) {
    this.cartImages = this.productImageService.getCartImages(item);
    return this.cartImages;
  }
}
