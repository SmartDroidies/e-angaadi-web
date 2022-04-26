import { TranslationService } from './service/translation.service';
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
import { TranslationPipe } from './pipes/translation.pipe';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [CartComponent, CartSummaryComponent, TranslationPipe],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    ScrollingModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  exports: [CartComponent, CartSummaryComponent, TranslationPipe],
})
export class SharedModule {}
