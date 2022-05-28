import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../product/components/category/category.component';
import { ProductListingComponent } from '../product/components/product-listing/product-listing.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    CategoryComponent,
    ProductListingComponent,
    ViewProductComponent,
    ViewProductComponent,
    ViewProductComponent,
    ProductItemComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    HttpClientModule,
    MatInputModule,
    ToastrModule.forRoot(),
    TranslateModule
  ],
  exports: [ViewProductComponent],
})
export class ProductModule {}
