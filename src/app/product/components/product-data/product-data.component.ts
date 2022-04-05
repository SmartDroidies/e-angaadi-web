import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.scss'],
})
export class ProductDataComponent implements OnInit, OnChanges {
  @Input() productGroupCode!: string;
  productsByGroup: Product[] = [];
  products: Product[] = [];
  product!: Product;

  constructor(private productService: ProductService) {}

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
