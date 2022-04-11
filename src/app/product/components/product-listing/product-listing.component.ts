import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cartItem';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit, OnChanges {
  @Input() productGroupCode!: string;
  products: Product[] = [];
  cartItems: CartItem[] = [];

  productsByGroup: Product[] = [];
  product!: Product;
  selectedUnit!: number;
  code!: string;
  quantity = 0;

  constructor(
    private productService: ProductService,
  ) { }


  ngOnInit(): void {
    this.getProducts();
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
