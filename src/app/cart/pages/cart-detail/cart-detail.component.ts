import { CartItem } from './../../../shared/models/cartItem';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';
import { Product } from 'src/app/product/models/product';
import { Router } from '@angular/router';
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
  signedIn = false;
  userId!: string;
  synced = false;

  constructor(private cartService: CartService, private router: Router, private ref: ChangeDetectorRef) { }
  displayedColumns1: string[] = ['title', 'quantity', 'total'];
  displayedColumns2: string[] = ['title', 'quantity', 'total'];
  ngOnInit(): void {
    this.getCart();
    this.showCart();
    this.updateCart();
  }

  getCart() {
    // from(Auth.currentAuthenticatedUser()).subscribe((user) => {
    //   if (user) {
    //     const userId = user.username;
    //     this.cartService.getCartItems(userId).subscribe((cartItems) => (this.items = cartItems));
    //   }
      // });
        this.items = this.cartService.getCart();
  }

  updateCart() {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].userId = user.username;
      }
      this.cartService
        .updateCartItems(this.items)
        .subscribe(() => 
           (this.getCart() ) 
        );
      
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
    this.cartService.updateCart(product, selectedUnit, +1);
    this.getTotal();
  }
  subUnit(product: Product, selectedUnit: number) {
    this.cartService.updateCart(product, selectedUnit, -1);
    this.getTotal();
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

  // onSave() {

  // }

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
}
