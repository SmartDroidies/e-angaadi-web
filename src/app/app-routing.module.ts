import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './core/component/signin/signin.component';
import { ProfileComponent } from './core/header/profile/profile.component';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
