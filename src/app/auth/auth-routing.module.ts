import { BlankLayoutComponent } from './../layouts/blank-layout/blank-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'auth', component: BlankLayoutComponent,
    children: [
      { path: 'sign-in', component: SignInComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
