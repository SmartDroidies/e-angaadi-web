import { CoreModule } from './core/core.module';
import { FullLayoutComponent } from './layouts/full-layout.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import { HomeModule } from './home/home.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';

// Amplify.configure({
//   Auth: {
//     userPoolId: 'ap-south-1_Rqzfipat9',
//     userPoolWebClientId: '2r7gu5kr5lbqm7d136v5il5m7f',
//     oauth: {
//       region: 'ap-south-1',
//       domain: 'shopperapp',
//       scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
//       redirectSignIn: 'http://localhost:4200/',
//       redirectSignOut: 'http://localhost:4200/',
//       responseType: 'code',
//     },
//   },
// });
@NgModule({
  declarations: [
    AppComponent,     
    FullLayoutComponent
  ],
  imports: [
    AuthModule,
    CoreModule,
    HomeModule,
    CartModule,
    BrowserModule,
    AppRoutingModule,
    AmplifyUIAngularModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
