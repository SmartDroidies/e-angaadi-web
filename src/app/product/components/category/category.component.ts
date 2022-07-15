import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductGroup } from '../../models/product-group';
import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Output() productGroupEvent = new EventEmitter<string>();

  productGroups: ProductGroup[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProductGroups();
  }

  getProductGroups(): void {
    this.productService
      .getProductGroups()
      .subscribe((groups) => (this.productGroups = groups.sort((a, b) => a.order - b.order)));
  }

  onGroupChange(groupCode: string) {
    this.productGroupEvent.emit(groupCode);
  }
}
