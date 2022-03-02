import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NavMenuComponent } from '../core-components/nav-menu/nav-menu.component';
import { UserComponent } from '../core-components/user/user.component';
import { SearchComponent } from '../core-components/search/search.component';
import { LocationComponent } from '../core-components/location/location.component';

@NgModule({
  declarations: [NavMenuComponent, UserComponent, SearchComponent, LocationComponent],
  imports: [CommonModule, CoreRoutingModule],
})
export class CoreModule {}
