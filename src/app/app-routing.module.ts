import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartdetailComponent } from './shared/components/cartdetail/cartdetail.component';
import { ProductDetailComponent } from './shared/components/product-detail/product-detail.component';
import { ProductListComponent } from './shared/components/product-list/product-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
  { path: 'products', component: ProductListComponent, pathMatch: 'full' },
  { path: 'productdetail/:code', component: ProductDetailComponent, pathMatch: 'full' },
  { path: 'cart', component: CartdetailComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
