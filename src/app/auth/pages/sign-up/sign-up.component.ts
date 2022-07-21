import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from '../../services/cognito.service';
import { CognitoUser } from '../../models/cognito-user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent {

  signupForm!: FormGroup;
  confirmForm!: FormGroup;
  loading: boolean;
  user: CognitoUser;
  showPassword = false;
  email!: string;
  isConfirm: boolean;
  signupError!: any;
  codeError!: any;
  resendError!: any;

  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService, private cognitoService: CognitoService) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as CognitoUser;
    this.signupForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8), Validators.maxLength(10)
        ]
      )
    });
    this.confirmForm = this.fb.group({
      code: new FormControl(
        '',
        [Validators.required]
      ),
    });

  }

  get f() {
    return this.signupForm.controls;
  }

  get c() {
    return this.confirmForm.controls;
  }


  toggleShowPassword(showBoolean: boolean) {
    this.showPassword = !showBoolean;
  }

  public async signUp(): Promise<void> {
    this.loading = true;
    this.user.email = this.signupForm.value.email;
    this.user.password = this.signupForm.value.password;

    if (this.signupForm.invalid) {
      return;
    }

    try {
      (await this.cognitoService.signUp(this.user)).toPromise()
        .then(() => {
          this.loading = false;
          this.isConfirm = true;
          this.toastr.success('Successfully code sent to mailid', 'Success', {
            positionClass: 'toast-bottom-center',
          });
        }).catch((e: any) => {
          this.loading = false;
          this.signupError = e;
          this.toastr.error('Error while signup', 'Error', {
            positionClass: 'toast-bottom-center',
          });
        });
    } catch (e) {
      this.signupError = e;
      this.toastr.error('Error while signup', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }

  public async confirmSignUp(): Promise<void> {
    this.loading = true;
    this.user.code = this.confirmForm.value.code;
    if (this.signupForm.invalid) {
      return;
    }
    try {
      (await this.cognitoService.confirmSignUp(this.user)).toPromise()
        .then(() => {
          this.router.navigate(['/auth/sign-in']);
          this.toastr.success('Successfully completed signup', 'Success', {
            positionClass: 'toast-bottom-center',
          });
        }).catch((e: any) => {
          this.loading = false;
          this.codeError = e;
          this.toastr.error('Error while confirmSignUp', 'Error', {
            positionClass: 'toast-bottom-center',
          });
        });
    } catch (e) {
      this.codeError = e;
      this.toastr.error('Error while confirmSignUp', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }

  async cancel() {
    await this.router.navigate(['/home']);
  }

  public async resendCode(): Promise<void> {
    this.loading = true;
    this.user.username = this.confirmForm.value.username;
    try {
      (await this.cognitoService.resendSignUp(this.user)).toPromise()
        .then(() => {
          this.toastr.success('Successfully code sent', 'Success', {
            positionClass: 'toast-bottom-center',
          });
        }).catch((e: any) => {
          this.loading = false;
          this.resendError = e;
          this.toastr.error('Error while sending code', 'Error', {
            positionClass: 'toast-bottom-center',
          });
        });
    } catch (e) {
      this.resendError = e;
      this.toastr.error('Error while sending code', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }
}