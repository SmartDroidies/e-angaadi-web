import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from './components/cart/cart.component';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [CartComponent, CartSummaryComponent],
  imports: [CommonModule, MatIconModule, MatCardModule, ScrollingModule],
  exports: [CartComponent, CartSummaryComponent],
})
export class SharedModule {}
