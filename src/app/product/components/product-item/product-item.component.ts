import { Component, Input } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product!: Product;
  selectedUnit!: number;
  quantity = 0;

  constructor(private productService: ProductService) {}

  selectChip(item: MatChip) {
    item.selected = !item.selected;
  }

  unitSelected(unit: number) {
    this.selectedUnit = unit;
  }

  addUnit() {
    this.quantity = this.quantity + 1;
  }

  subUnit() {
    this.quantity = this.quantity - 1;
  }
}
