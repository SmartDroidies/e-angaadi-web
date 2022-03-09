import { CartDetailComponent } from './pages/cart-detail/cart-detail.component';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  declarations: [CartDetailComponent],
  imports: [CartRoutingModule, MatCardModule],
})
export class CartModule {}
