import { CartDetailComponent } from './pages/cart-detail/cart-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from '../layouts/full-layout.component';

const routes: Routes = [
  {
    //FIXME - Use Auth Guard for FullLayout
    path: 'cart',
    component: FullLayoutComponent,
    children: [
      { path: 'detail', component: CartDetailComponent },
      { path: '', component: CartDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
