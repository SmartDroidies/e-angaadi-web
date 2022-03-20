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
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [NavMenuComponent, UserComponent, SearchComponent, LocationComponent, HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    AmplifyUIAngularModule,
    MatButtonModule,
    MatMenuModule,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
