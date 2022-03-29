import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { CartService } from 'src/app/shared/service/cart.service';
import { Product } from '../../models/product';
import { ProductPrice } from '../../models/product-price';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit, OnChanges {
  @Input() productGroupCode!: string;
  products: Product[] = [];
  productsByGroup: Product[] = [];
  product!: Product;
  liveVersion: Product = new Product();
  priceLiveVersion: ProductPrice = new ProductPrice();
  code:any;

  constructor(private productService: ProductService, private cart: CartService) { }

  ngOnInit(): void {
    this.getProducts();
    this.loadPriceLiveVersion(this.code);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productGroupCode'] && changes['productGroupCode'].currentValue) {
      this.productsByGroup = this.products.filter(
        (product) => product.group === changes['productGroupCode'].currentValue
      );
    }
  }
  
  selectChip(item: MatChip) {
    item.selected = !item.selected;
 }
  getProducts(): void {
    this.productService.getProducts('live').subscribe((products) => (this.products = products));
  }

  addCart(code: string) {
    this.productService.getProduct(code, 'live').subscribe((data: Product) => {
      if (data) {
        this.liveVersion = data;
        this.cart.addToCart(this.liveVersion);
      }
    });
  }

  loadPriceLiveVersion(code:any) {
    this.productService.getProductPrice(code, 'live').subscribe((data: ProductPrice) => {
      if (data) {
        this.priceLiveVersion = data;
      }
    });
  }

}
