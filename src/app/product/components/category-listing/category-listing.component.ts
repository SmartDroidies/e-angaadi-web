import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductGroup } from '../../models/product-group';
import { ProductImage } from '../../models/product-image';
import { ProductImageService } from '../../service/product-image.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.scss']
})
export class CategoryListingComponent implements OnInit {
  @Output() productGroupEvent = new EventEmitter<string>();

  productGroups: ProductGroup[] = [];
  categoryImages!:ProductImage;

  constructor(private productService: ProductService,private productImageService:ProductImageService) {}

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

  collectCategoryImages(groupItems: string) {
    this.categoryImages = this.productImageService.getCategoryImages(groupItems);
    return this.categoryImages;
  }

}
