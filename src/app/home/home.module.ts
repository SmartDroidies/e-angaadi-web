import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ProductModule } from '../product/product.module';
import { AccountInfoComponent } from './pages/account-info/account-info.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [HomeComponent, AccountInfoComponent, ProfileComponent],
  imports: [CommonModule, HomeRoutingModule, ProductModule, MatSidenavModule, MatDividerModule],
})
export class HomeModule {}
