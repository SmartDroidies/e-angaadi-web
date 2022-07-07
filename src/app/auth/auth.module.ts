import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, AmplifyUIAngularModule, AuthRoutingModule,FormsModule,MatIconModule],
})
export class AuthModule {}
