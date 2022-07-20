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

  constructor(private router: Router, private fb: FormBuilder,
    private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as CognitoUser;
  }

  toggleShowPassword(showBoolean: boolean) {
    this.showPassword = !showBoolean;
  }

  public async signIn(): Promise<void> {
    this.loading = true;
    (await this.cognitoService.signIn(this.user)).toPromise()
      .then(() => {
        this.cancel();
      }).catch(() => {
        this.loading = false;
      });
  }

  async cancel() {
    await this.router.navigate(['/home']);
  }

  async signUp() {
    await this.router.navigate(['/auth/sign-up']);
  }
}