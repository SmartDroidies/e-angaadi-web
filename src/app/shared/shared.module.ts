import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from './components/cart/cart.component';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [CartComponent, CartSummaryComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    ScrollingModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
  ],
  exports: [CartComponent, CartSummaryComponent],
})
export class SharedModule {}
