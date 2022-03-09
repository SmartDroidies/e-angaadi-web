import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../product/components/category/category.component';
import { ProductListingComponent } from '../product/components/product-listing/product-listing.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [CategoryComponent, ProductListingComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatChipsModule],
  exports: [CategoryComponent, ProductListingComponent],
})
export class ProductModule {}
