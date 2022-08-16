import { CartItem } from './../../../shared/models/cartItem';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';
import { Product } from 'src/app/product/models/product';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { from } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductImageService } from 'src/app/product/service/product-image.service';
import { ProductImage } from 'src/app/product/models/product-image';
import { CartBadgeService } from 'src/app/shared/components/cart/cart-badge.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
})
export class CartDetailComponent implements OnInit {
  @Input() product!: Product;
  items: CartItem[] = [];
  showCartSection!: boolean;
  userId!: string;
  displayedColumns: string[] = ['title', 'quantity', 'total'];
  cartImages!: ProductImage;
  price!: number;
  saved!: boolean;
  constructor(
    private cartService: CartService,
    private router: Router,
    private cartBadgeService: CartBadgeService,
    private ref: ChangeDetectorRef,
    private translate: TranslateService,
    private productImageService: ProductImageService
  ) {}

  ngOnInit(): void {
    this.getCart();
    this.cartBadgeService.change.subscribe(() => {
      this.getCart();
    });
    this.showCart();
    // this.updateCart();
  }

  getUpdateCart() {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const userId = user.username as string;
      this.cartService
        .getCartItems(userId)
        .subscribe((userCart) => window.localStorage.setItem('user_cart', JSON.stringify(userCart)));
    });
  }
  getCart() {
    // this.getUpdateCart();
    this.items = this.cartService.getCart();
  }

  // updateCart() {
  //   const cartItem: CartItem[] = [];
  //   from(Auth.currentAuthenticatedUser()).subscribe((user) => {
  //     for (let i = 0; i < this.items.length; i++) {
  //       if (this.items[i].synced == false) {
  //         cartItem.push(this.items[i]);
  //       }
  //       this.items[i].userId = user.username;
  //     }
  //     this.cartService
  //       .updateCartItems(cartItem)
  //       .subscribe(() =>
  //         (this.getCart())
  //       );

  //   });
  // }

  showCart() {
    if (this.items.length > 0) {
      this.showCartSection = true;
    } else {
      this.showCartSection = false;
    }
  }

  addUnit(product: Product, selectedUnit: number, price: number) {
    this.cartService.updateCart(product, selectedUnit, +1, price);
    this.getCart();
  }

  subUnit(product: Product, selectedUnit: number, price: number) {
    this.cartService.updateCart(product, selectedUnit, -1, price);
    this.getCart();
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

  onSave(cartItem: CartItem) {
    this.cartService.updateCartSaveStatus(cartItem, true);
    this.getCart();
  }

  // emptyCart() {
  //   return
  // }

  getTotal() {
    let total = 0;

    this.items.forEach((items) => {
      total += this.getSubTotal(items);
    });
    return total;
  }

  async onShopping() {
    await this.router.navigate(['/home']);
  }

  getTotalQuantity() {
    let totalQuantity = 0;
    this.items.forEach((items) => {
      totalQuantity += items.quantity;
    });
    return totalQuantity;
  }

  collectCartImages(item: CartItem) {
    this.cartImages = this.productImageService.getCartImages(item);
    return this.cartImages;
  }
}
