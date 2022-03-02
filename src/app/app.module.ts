import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import { CoreModule } from './core/core-module/core.module';
import { SharedModule } from './shared/shared-module/shared.module';
import { HomeModule } from './home/home-module/home.module';
import { SharedRoutingModule } from './shared/shared-module/shared-routing.module';
import { CoreRoutingModule } from './core/core-module/core-routing.module';
import { HomeRoutingModule } from './home/home-module/home-routing.module';

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
  declarations: [AppComponent],
  imports: [
    CoreModule,
    SharedModule,
    HomeModule,
    BrowserModule,
    SharedRoutingModule,
    CoreRoutingModule,
    HomeRoutingModule,
    AppRoutingModule,
    AmplifyUIAngularModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
