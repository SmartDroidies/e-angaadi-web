import { CartItem } from './../../../shared/models/cartItem';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';
import { Product } from 'src/app/product/models/product';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
import { from } from 'rxjs';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
})
export class CartDetailComponent implements OnInit {
  @Input() product!: Product;
  items: CartItem[] = [];
  saved: any;
  show!: boolean;
  authData: CognitoUserInterface | undefined;
  authState!: AuthState;
  signedIn = false;
  userId!: string;


  constructor(private cartService: CartService, private router: Router, private ref: ChangeDetectorRef) { }
  displayedColumns1: string[] = ['title', 'quantity', 'total'];
  displayedColumns2: string[] = ['title', 'quantity', 'total'];
  ngOnInit(): void {
    this.getCart();
    this.showCart();
  }

  getCart() {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      if (this.signedIn = true) {
       let userId = user.username;
        this.cartService.getCartItems(userId).subscribe((cartItems) => (this.items = cartItems));
      }
    });
  }

  showCart() {
    if (this.items.length > 0) {
      this.show = true;
    }
    else {
      this.show = false;
    }
  }

  addUnit(product: Product, selectedUnit: number) {
    this.cartService.addToCart(product);
    // this.getTotal();
  }
  subUnit(product: Product, selectedUnit: number) {
    this.cartService.addToCart(product);
    // this.getTotal();
  }

  getSubTotal(cartItem: CartItem) {
    let subTotal = 0;
    this.items.forEach((loopItem) => {
      if (loopItem.code === cartItem.code && loopItem.unit === cartItem.unit) {
        //FIXME - The price needs to be pulled from the service
        subTotal = 50 * cartItem.quantity;
      }
    });
    return subTotal;
  }

  onSave() {

  }

  emptyCart() {
    return
  }

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
}
