import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { LocationComponent } from './components/location/location.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { SearchComponent } from './components/search/search.component';
import { UserComponent } from './components/user/user.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavMenuComponent, UserComponent, SearchComponent, LocationComponent, HeaderComponent],
  imports: [CommonModule, SharedModule, MatToolbarModule, MatIconModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
