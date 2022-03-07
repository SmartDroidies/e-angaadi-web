import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [HomeComponent, CategoryComponent, ProductListingComponent],
  imports: [CommonModule, HomeRoutingModule, MatCardModule, MatButtonModule, MatChipsModule],
})
export class HomeModule {}
