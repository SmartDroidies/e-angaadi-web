import { Injectable } from '@angular/core';
import { Product } from 'src/app/product/models/product';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})

export class CartService {

  cartItems: CartItem[] = [];

  updateCart(product: Product, selectedUnit: number, quantity: number) {
    const itemInCart = this.getCartItem(product.code, selectedUnit);
    if (itemInCart) {
      itemInCart.quantity = itemInCart.quantity + quantity;
      if (itemInCart.quantity == 0) {
        this.removeItemInCart(itemInCart);
      }
    } else {
      this.addToCart(this.toCartItem(product, selectedUnit, quantity));
    }
  }

  removeItemInCart(itemInCart: CartItem) {

    // for(var i=0;i<this.cartItems.length;i++){
    //   if(this.cartItems[i].code=itemInCart.code){
    //     this.cartItems.splice(i,1);
    //     console.log(this.cartItems);
    //     break;
    //   }
    // }

    // this.cartItems.splice(0);
    // console.log(this.cartItems);
    // return itemInCart;

    // this.cartItems = this.cartItems.filter(item => item.code != itemInCart.code);
    // console.log(this.cartItems);
    // return this.cartItems;

  }

  addToCart(cartItem: CartItem) {
    this.cartItems.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  toCartItem(product: Product, selectedUnit: number, quantity: number): CartItem {
    const cartItem = new CartItem(product.code, selectedUnit, quantity, product.title, product.submetric);
    return cartItem;
  }

  getCartItem(code: string, selectedUnit: number) {
    return this.cartItems.find((item) => item.code == code && item.unit == selectedUnit);
  }


  getCartProductItems(code: string): CartItem[] {
    return this.cartItems.filter((item) => item.code == code);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }
}

//FIXME - Check for availability of the product/unit in the cart
//FIXME - If the combination item is found add/subract quantity (CartItem)
//FIXME - If the count is zero now remove the item from cart
//FIXME - if the count is greater than zero update the item back in cart
//FIXME - If the combination item is not there in the cart create a new CartItem object and add it to the cart
