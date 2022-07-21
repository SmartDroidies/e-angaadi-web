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
  loading: boolean;
  user: CognitoUser;
  showPassword = false;
  email!: string;
  isConfirm: boolean;
  signupError!:any;
  codeError!:any;

  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService,private cognitoService: CognitoService) {
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
      ),
      code: new FormControl(
        '',
        [
          Validators.required        ]
      ),
    });

  }

  get f() {
    return this.signupForm.controls;
  }


  toggleShowPassword(showBoolean: boolean) {
    this.showPassword = !showBoolean;
  }

  public async signUp(): Promise<void> {
    this.loading = true;
    this.user.email=this.signupForm.value.email;
    this.user.password=this.signupForm.value.password;

    if (this.signupForm.invalid) {
      return;
    }
    try{
    (await this.cognitoService.signUp(this.user)).toPromise()
      .then(() => {
        this.loading = false;
        this.isConfirm = true;
      }).catch(() => {
        this.loading = false;
      });
    }catch (e) {
      this.signupError=e;
      this.toastr.error('Error while saving', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }

  public async confirmSignUp(): Promise<void> {
    this.loading = true;
    this.user.code=this.signupForm.value.code;
    if (this.signupForm.invalid) {
      return;
    }
    try{
    (await this.cognitoService.confirmSignUp(this.user)).toPromise()
      .then(() => {
        this.router.navigate(['/auth/sign-in']);
      }).catch(() => {
        this.loading = false;
      });
    }catch (e) {
      this.codeError=e;
      this.toastr.error('Error while saving', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }

  async cancel() {
    await this.router.navigate(['/home']);
  }

}