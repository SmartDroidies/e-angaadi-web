import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { from } from 'rxjs';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  cartTotal = 0;
  badgeHidden!:boolean;  
  userId!:string;
  signedIn=false;

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItem();
  }


  getCartItem(): void  {
    // from(Auth.currentAuthenticatedUser()).subscribe((user) => {
    //   if (this.signedIn = true) {
    //    let userId = user.username;
    //     this.cartService.getCartItems(userId).subscribe((cartItems) => (this.items = cartItems));
    //   }
    // });
    this.items = this.cartService.getCart();
  }

  async onCart() {
    await this.router.navigate(['/cart']);
    this.badgeHidden=true;
  }


  getCartTotal() {
    let cartTotal = 0;
    this.items.forEach((items) => {
      cartTotal += items.price;
    });
    return cartTotal;
  }

  getTotalQuantity() {
    let totalQuantity = 0;
    this.items.forEach((items) => {
      totalQuantity += items.quantity;
    });
    return totalQuantity;
  }
}
