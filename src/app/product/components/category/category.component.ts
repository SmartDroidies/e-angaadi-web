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
  activeProductGroupCode: string | undefined = undefined;

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
    this.activeProductGroupCode = groupCode;
    this.productGroupEvent.emit(groupCode);
  }

  isActive(currentProductGroup: ProductGroup): boolean {
    return currentProductGroup.code == this.activeProductGroupCode ? true : false;
  }
}
