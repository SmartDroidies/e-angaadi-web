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
  priceLiveVersion: ProductPrice = new ProductPrice();
  selectedUnit!: number;
  code!: string;
  quantity = 0;
  isUnitSelected = false;

  constructor(private productService: ProductService, private cart: CartService) {}

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

  selectChip(item: MatChip) {
    item.selected = !item.selected;
  }

  unitSelected(unit: number) {
    this.selectedUnit = unit;
    this.isUnitSelected = !this.isUnitSelected;
  }

  addCart(product: Product) {
    if (this.isUnitSelected) {
      this.quantity = +1;
      if (this.quantity > 0) {
        this.cart.updateCart(product, this.selectedUnit, this.quantity);
      } else {
        this.cart.removeCart(product, this.selectedUnit, this.quantity);
      }
    }
  }

  addUnit() {
    this.quantity = this.quantity + 1;
  }

  SubUnit() {
    this.quantity = this.quantity - 1;
  }
}
