import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from '../layouts/full-layout/full-layout.component';
import { AddressComponent } from './pages/address/address.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AccountInfoComponent } from './pages/account-info/account-info.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
    {
      path: 'account',component: FullLayoutComponent,
      children: [
        {
          path: 'account-info',
          component: AccountInfoComponent,canActivate: [AuthGuard],
          children: [
            { path: 'profile', component: ProfileComponent, },
            { path: 'address', component: AddressComponent },
          ],
        },
        
       { path: 'change-password', component: ChangePasswordComponent, },
      ],
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}