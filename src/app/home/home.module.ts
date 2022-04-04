import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ProductModule } from '../product/product.module';
import { AccountInfoComponent } from './pages/account-info/account-info.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddressComponent } from './pages/address/address.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [HomeComponent, AccountInfoComponent, ProfileComponent, AddressComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ProductModule,
    MatSidenavModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
