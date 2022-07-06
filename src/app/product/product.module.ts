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
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { CarouselComponent, CarouselItemElement} from './components/carousel/carousel.component';
import { CarouselItemDirective } from './directive/carousel-item.directive';
@NgModule({
  declarations: [
    CategoryComponent,
    ProductListingComponent,
    ViewProductComponent,
    ProductItemComponent,
    SearchResultsComponent,
    ProductImageComponent,
    CarouselComponent,
    CarouselItemElement,
    CarouselItemDirective
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
    TranslateModule,
    ProductRoutingModule
  ],
  exports: [ViewProductComponent],
})
export class ProductModule {}
