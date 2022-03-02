import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CartComponent } from '../shared-components/cart/cart.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, SharedRoutingModule, MatIconModule],
  exports: [CartComponent],
})
export class SharedModule {}
