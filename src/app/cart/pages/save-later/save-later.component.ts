import { Component, OnInit } from '@angular/core';
import { ProductImage } from 'src/app/product/models/product-image';
import { ProductImageService } from 'src/app/product/service/product-image.service';
import { CartBadgeService } from 'src/app/shared/components/cart/cart-badge.service';
import { CartItem } from 'src/app/shared/models/cartItem';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-save-later',
  templateUrl: './save-later.component.html',
  styleUrls: ['./save-later.component.scss']
})
export class SaveLaterComponent implements OnInit {
  items: CartItem[] = [];
  cartImages!: ProductImage;

  constructor(private cartService: CartService,private productImageService: ProductImageService,private cartBadgeService: CartBadgeService) { }

  ngOnInit(): void {
    this.getCart();
    this.cartBadgeService.change.subscribe(()=> {
      this.getCart();
    });
  }

 getCart(){

    this.items = this.cartService.getCart();

  }

  onAdd(cartProduct:CartItem){
    this.items.forEach((loopItem)=>{
      if(loopItem.code === cartProduct.code && loopItem.unit === cartProduct.unit ){
        loopItem.saved=false;
        // this.items.push(loopItem);
        window.localStorage.setItem('user_cart', JSON.stringify(this.items))
      }
    })
  }

  collectCartImages(item: CartItem) {
    this.cartImages = this.productImageService.getCartImages(item);
    return this.cartImages;
  }

}
