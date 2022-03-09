import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from './components/cart/cart.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CartComponent, CartSummaryComponent],
  imports: [CommonModule, MatIconModule,MatCardModule],
  exports: [CartComponent, CartSummaryComponent],
})
export class SharedModule {}

//FIXME - (Jagan) Is there a need for module for sharedModule
