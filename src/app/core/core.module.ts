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
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [NavMenuComponent, UserComponent, SearchComponent, LocationComponent, HeaderComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatMenuModule,
    AmplifyUIAngularModule,
    MatButtonModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
