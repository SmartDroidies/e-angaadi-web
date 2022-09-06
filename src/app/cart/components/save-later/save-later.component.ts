import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Auth } from 'aws-amplify';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
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
  signedIn=false;

  constructor(
    private cartService: CartService,
    private productImageService: ProductImageService,
    private cartBadgeService: CartBadgeService,
    private translate: TranslateService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.getSaved();
    this.cartBadgeService.change.subscribe(() => {
      this.getSaved();
    });
    this.cartView();
  }

  getSaved() {
    this.items = this.cartService.getUserSavedItems();
    if (this.items.length > 0) {
      this.showSaveSection = true;
    } else {
      this.showSaveSection = false;
    }
  }

  cartView() {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      this.signedIn = true;
    });
  }
  
  onAdd(cartItem: CartItem) {
    this.cartService.updateCartSaveStatus(cartItem, false);
    this.getSaved();
  }

  onRemove(cartItem: CartItem) {
    this.cartService.removeItemInCart(cartItem);
    this.toastr.success('Item removed from saved list', 'Success', {
      positionClass: 'toast-bottom-center',
    });
    this.getSaved();
  }

  collectCartImages(item: CartItem) {
    this.cartImages = this.productImageService.getCartImages(item);
    return this.cartImages;
  }
}
