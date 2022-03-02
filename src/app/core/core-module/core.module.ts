import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreRoutingModule } from './core-routing.module';
import { NavMenuComponent } from '../core-components/nav-menu/nav-menu.component';
import { UserComponent } from '../core-components/user/user.component';
import { SearchComponent } from '../core-components/search/search.component';
import { LocationComponent } from '../core-components/location/location.component';
import { HeaderComponent } from '../core-components/header/header.component';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NavMenuComponent, UserComponent, SearchComponent, LocationComponent, HeaderComponent],
  imports: [CommonModule, SharedModule, CoreRoutingModule, MatToolbarModule, MatIconModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
