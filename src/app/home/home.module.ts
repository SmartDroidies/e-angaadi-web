import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [HomeComponent, CategoryComponent, ProductListingComponent],
  imports: [CommonModule, HomeRoutingModule, MatCardModule, MatButtonModule, MatSlideToggleModule],
})
export class HomeModule {}
