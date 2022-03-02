import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CartComponent } from '../shared-components/cart/cart.component';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, SharedRoutingModule],
})
export class SharedModule {}
