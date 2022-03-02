import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./core/core-module/core.module').then((m) => m.CoreModule) },
  { path: 'shared', loadChildren: () => import('./home/home-module/home.module').then((m) => m.HomeModule) },
  { path: 'core', loadChildren: () => import('./shared/shared-module/shared.module').then((m) => m.SharedModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
