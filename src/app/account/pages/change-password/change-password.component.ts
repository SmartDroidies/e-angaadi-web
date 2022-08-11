import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { ToastrService } from 'ngx-toastr';
import { CognitoService } from 'src/app/auth/services/cognito.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  showPassword = false;
  showOldPassword = false;
  passError!: any;
  loading!: boolean;


  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.passwordForm = this.fb.group({
      user: new FormControl('', [Validators.required, Validators.minLength(4)]),
      oldPassword: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8), Validators.maxLength(10)
        ]
      ),
      newPassword: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8), Validators.maxLength(10)
        ],

      ),
    });
  }

  ngOnInit(): void {
    void this.initUser();
  }

  get f() {
    return this.passwordForm.controls;
  }

  toggleShowOldPassword() {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  async initUser() {
    const currentUser = await this.cognitoService.currentAuthenticatedUser()
    this.passwordForm.patchValue({ user: currentUser.attributes.name });
  }

  async onChangePassword(): Promise<void> {

    if (this.passwordForm.invalid) {
      return;
    }

    try {
      const user = await Auth.currentAuthenticatedUser()
      const Values = this.passwordForm.value;
      await Auth.changePassword(user, Values.oldPassword, Values.newPassword)
      this.router.navigate(['/auth/sign-in']);
      this.toastr.success('Successfully changed password', 'Success', {
        positionClass: 'toast-bottom-center',
      });
    } catch (e) {
      this.passError = e;
      this.toastr.error('Error while saving', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }

}