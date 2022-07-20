import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from '../../services/cognito.service';
import { CognitoUser } from '../../models/cognito-user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent {

  loading: boolean;
  user: CognitoUser;
  showPassword = false;
  email!: string;
  isConfirm: boolean;

  constructor(private router: Router, private fb: FormBuilder,
    private cognitoService: CognitoService) {
    this.loading = false;
    this.isConfirm = true;
    this.user = {} as CognitoUser;
  }

  toggleShowPassword(showBoolean: boolean) {
    this.showPassword = !showBoolean;
  }

  public async signUp(): Promise<void> {
    this.loading = true;
    (await this.cognitoService.signUp(this.user)).toPromise()
    .then(() => {
      this.loading = false;
      this.isConfirm = true;
    }).catch(() => {
      this.loading = false;
    });
  }

  public async confirmSignUp():Promise<void> {
    this.loading = true;
    (await this.cognitoService.confirmSignUp(this.user)).toPromise()
    .then(() => {
      this.router.navigate(['/auth/sign-in']);
    }).catch(() => {
      this.loading = false;
    });
  } 

  async cancel() {
    await this.router.navigate(['/home']);
  }

}