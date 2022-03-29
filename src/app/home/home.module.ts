import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ProductModule } from '../product/product.module';
import { AccountInfoComponent } from './pages/account-info/account-info.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [HomeComponent, AccountInfoComponent],
  imports: [CommonModule, HomeRoutingModule, ProductModule, MatSidenavModule, MatDividerModule],
})
export class HomeModule {}
