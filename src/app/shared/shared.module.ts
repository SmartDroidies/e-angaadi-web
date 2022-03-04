import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from './components/cart/cart.component';
import { CartdetailComponent } from './components/cartdetail/cartdetail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
  declarations: [CartComponent, CartdetailComponent, ProductListComponent, ProductDetailComponent],
  imports: [CommonModule, MatIconModule],
  exports: [CartComponent],
})
export class SharedModule {}

//FIXME - (Jagan) Is there a need for module for sharedModule
