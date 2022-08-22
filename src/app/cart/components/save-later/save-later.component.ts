import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  showSaveSection!: boolean;


  constructor(
    private cartService: CartService,
    private productImageService: ProductImageService,
    private cartBadgeService: CartBadgeService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getSaved();
    this.cartBadgeService.change.subscribe(() => {
      this.getSaved();
    });
    this.showSave();
  }

  getSaved() {
    this.items = this.cartService.getUserSavedItems();
  }
  showSave() {
    if (this.items.length > 0) {
      this.showSaveSection = true;
    } else {
      this.showSaveSection = false;
    }
  }
  onAdd(cartItem: CartItem) {
    this.cartService.updateCartSaveStatus(cartItem, false);
    this.getSaved();
  }

  onRemove(cartItem: CartItem) {
    this.cartService.removeItemInCart(cartItem);
  }

  collectCartImages(item: CartItem) {
    this.cartImages = this.productImageService.getCartImages(item);
    return this.cartImages;
  }
}
