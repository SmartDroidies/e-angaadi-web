import { CartDetailComponent } from './pages/cart-detail/cart-detail.component';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CartRoutingModule } from './cart-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CartDetailComponent],
  imports: [CartRoutingModule, MatCardModule, CommonModule],
})
export class CartModule {}
