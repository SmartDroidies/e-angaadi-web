import { CartDetailComponent } from './pages/cart-detail/cart-detail.component';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CartRoutingModule } from './cart-routing.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
@NgModule({
  declarations: [CartDetailComponent],
  imports: [CartRoutingModule, MatCardModule, CommonModule, MatTableModule, CdkTableModule],
})
export class CartModule {}
