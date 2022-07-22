import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from '../../services/cognito.service';
import { CognitoUser } from '../../models/cognito-user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  codeForm!: FormGroup;
  confirmForm!: FormGroup;
  loading: boolean;
  user: CognitoUser;
  showPassword = false;
  email!: string;
  isConfirm: boolean;
  codeError!: any;
  submitError!: any;
  resendError!: any;

  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService, private cognitoService: CognitoService) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as CognitoUser;
    this.codeForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
    this.confirmForm = this.fb.group({
      code: new FormControl(
        '',
        [Validators.required]
      ),
      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8), Validators.maxLength(10)
        ]
      )
    });

  }

  get f() {
    return this.codeForm.controls;
  }

  get c() {
    return this.confirmForm.controls;
  }


  toggleShowPassword(showBoolean: boolean) {
    this.showPassword = !showBoolean;
  }

  public async forgotpasswordConfirm(): Promise<void> {
    this.loading = true;
    this.user.email = this.codeForm.value.email;

    if (this.codeForm.invalid) {
      return;
    }

    try {
      (await this.cognitoService.forgotPassword(this.user)).toPromise()
        .then(() => {
          this.loading = false;
          this.isConfirm = true;
          this.toastr.success('Successfully code sent to mailid', 'Success', {
            positionClass: 'toast-bottom-center',
          });
        }).catch((e: any) => {
          this.loading = false;
          this.codeError = e;
          this.toastr.error('Error while forgot password', 'Error', {
            positionClass: 'toast-bottom-center',
          });
        });
    } catch (e) {
      this.codeError = e;
      this.toastr.error('Error while password', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }

  public async confirmForgotPassword(): Promise<void> {
    this.loading = true;
    this.user.code = this.confirmForm.value.code;
    this.user.password=this.confirmForm.value.password;
    this.user.email=this.codeForm.value.email;

    if (this.codeForm.invalid) {
      return;
    }

    try {
      (await this.cognitoService.forgotPasswordSubmit(this.user)).toPromise()
        .then(() => {
          this.router.navigate(['/auth/sign-in']);
          this.toastr.success('Successfully changed password', 'Success', {
            positionClass: 'toast-bottom-center',
          });
        }).catch((e: any) => {
          this.loading = false;
          this.submitError = e;
          this.toastr.error('Error while change password', 'Error', {
            positionClass: 'toast-bottom-center',
          });
        });
    } catch (e) {
      this.submitError = e;
      this.toastr.error('Errorwhile change password', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }

  async cancel() {
    await this.router.navigate(['/home']);
  }

  public async resendCode(): Promise<void> {
    this.loading = true;
    this.user.email = this.codeForm.value.email;
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