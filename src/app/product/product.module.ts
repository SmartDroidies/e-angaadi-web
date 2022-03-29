import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../product/components/category/category.component';
import { ProductListingComponent } from '../product/components/product-listing/product-listing.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { ManageProductComponent } from './pages/manage-product/manage-product.component';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [CategoryComponent, ProductListingComponent, ManageProductComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatChipsModule, HttpClientModule,MatInputModule],
  exports: [ManageProductComponent],
})
export class ProductModule {}
