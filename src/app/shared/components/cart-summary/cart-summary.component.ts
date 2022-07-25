import { Component, OnInit } from '@angular/core';
import { ProductImage } from 'src/app/product/models/product-image';
import { ProductImageService } from 'src/app/product/service/product-image.service';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  items: CartItem[] = [];
  userId!:string;
  signedIn=false;
  cartImages!: ProductImage;

  constructor(private cartService: CartService,private productImageService: ProductImageService) {}

  ngOnInit(): void {
    this.loadCartData();
  }

  loadCartData(): void  {
    this.items = this.cartService.getCart();
  }


  collectCartImages(item:CartItem) {
     this.cartImages = this.productImageService.getCartImages(item);  
     return this.cartImages;
 }
}
