import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AccountRoutingModule } from './account-routing.module';
import { AddressComponent } from './pages/address/address.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AccountInfoComponent } from './pages/account-info/account-info.component';



@NgModule({
  declarations: [ AccountInfoComponent, ProfileComponent, AddressComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AccountRoutingModule,
  ],
})
export class AccountModule {}