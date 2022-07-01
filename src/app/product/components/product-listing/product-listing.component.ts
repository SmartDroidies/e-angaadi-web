import { CartService } from './../../../shared/service/cart.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cartItem';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { from } from 'rxjs';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit, OnChanges {
  @Input() productGroupCode!: string;
  products: Product[] = [];
  cartItems: CartItem[] = [];
  userId!:string;
  productsByGroup: Product[] = [];
  product!: Product;
  selectedUnit!: number;
  code!: string;
  quantity = 0;
  signedIn=false;
  
  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.getProducts();
    this.loadCartItems();
  }

  loadCartItems() {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      if (this.signedIn = true) {
       let userId = user.username;
        this.cartService.getCartItems(userId).subscribe((cartItems) => (this.cartItems = cartItems));
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productGroupCode'] && changes['productGroupCode'].currentValue) {
      this.productsByGroup = this.products.filter(
        (product) => product.group === changes['productGroupCode'].currentValue
      );
    }
  }

  getProducts(): void {
    this.productService.getProducts('live').subscribe((products) => (this.products = products));
  }
}
