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
  signedIn = false;
  userId!: string;
  flag!:boolean

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

  updateCart(){
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      if (this.signedIn = true ) {
        this.items = this.cartService.getCart();
        for (let i = 0; i < this.items.length; i++) {
         
        this.items[i].flag=true;
        this.items[i].userId = user.username;
        console.log (this.items[i])
        }
       this.cartService.updateCartItems(this.items).subscribe();
      }
    });
  }
  
  async onCart() {
    await this.router.navigate(['/cart']);
    this.badgeHidden=true;
    this.updateCart();
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
