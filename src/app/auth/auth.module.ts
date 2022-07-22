import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, ForgotPasswordComponent],
  imports: [CommonModule, AmplifyUIAngularModule, AuthRoutingModule,FormsModule,MatIconModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,MatButtonModule],
})
export class AuthModule {}
