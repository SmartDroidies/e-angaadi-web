import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  SignInComponent } from './pages/sign-in/sign-in.component';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';

//FIXME - This has to be configure in the App Module
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
  declarations: [SignInComponent],
  imports: [CommonModule,AmplifyUIAngularModule, AuthRoutingModule],
})
export class AuthModule { }
