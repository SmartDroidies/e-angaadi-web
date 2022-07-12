import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from '../layouts/full-layout/full-layout.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';

const routes: Routes = [
  {
    //FIXME - Use Auth Guard for FullLayout
    path: 'product',
    component: FullLayoutComponent,
    children: [
      { path: 'search/:searchword', component: SearchResultsComponent },
      { path: '', component: ViewProductComponent },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
