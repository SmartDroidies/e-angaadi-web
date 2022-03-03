import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';

@NgModule({
  declarations: [HomeComponent, CategoryComponent, ProductListingComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
