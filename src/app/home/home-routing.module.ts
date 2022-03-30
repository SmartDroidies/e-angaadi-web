import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from '../layouts/full-layout/full-layout.component';
import { AccountInfoComponent } from './pages/account-info/account-info.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    //FIXME - Use Auth Guard for FullLayout
    path: 'home',
    component: FullLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'account-info', component: AccountInfoComponent, children: [{ path: 'profile', component: ProfileComponent }] },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
