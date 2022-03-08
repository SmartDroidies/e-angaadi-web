import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from './components/cart/cart.component';
import { CartdetailComponent } from './components/cartdetail/cartdetail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { DropdowncartComponent } from './components/dropdowncart/dropdowncart.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CartComponent, CartdetailComponent, ProductListComponent, ProductDetailComponent, DropdowncartComponent],
  imports: [CommonModule, MatIconModule,MatCardModule],
  exports: [CartComponent],
})
export class SharedModule {}

//FIXME - (Jagan) Is there a need for module for sharedModule
