import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { NavmenuComponent } from './core/navmenu/navmenu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import Amplify from 'aws-amplify';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

Amplify.configure({
  Auth: {
    userPoolId: 'ap-south-1_Rqzfipat9',
    userPoolWebClientId: '2r7gu5kr5lbqm7d136v5il5m7f',
    oauth: {
      region: 'ap-south-1',
      domain: 'shopperapp',
      scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: 'http://localhost:4200/',
      redirectSignOut: 'http://localhost:4200/',
      responseType: 'code',
    },
  },
});
@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, NavmenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    AmplifyUIAngularModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
