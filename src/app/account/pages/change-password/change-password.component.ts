import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  oldPassword!: string;
  newPassword!: string;
  showPassword: boolean = false;
  showOldPassword: boolean = false;
  name!: string;
  passError!: any;
  loading!: boolean;


  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router) {
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

  setData() {
    this.passwordForm.controls['user'].setValue(this.name)
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

  initUser() {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      if (user && user.attributes) {
        this.name = user.attributes.name as string;
      }
    });
  }

  async onChangePassword(): Promise<void> {

    if (this.passwordForm.invalid) {
      return;
    }

    try {
      const user = await Auth.currentAuthenticatedUser()
      let Values = this.passwordForm.value;
      this.oldPassword = Values.oldPassword;
      this.newPassword = Values.newPassword;
      await Auth.changePassword(user, this.oldPassword, this.newPassword).then(() => {
        this.router.navigate(['/auth/sign-in']);
        this.toastr.success('Successfully changed password', 'Success', {
          positionClass: 'toast-bottom-center',
        });
      }).catch((e: any) => {
        this.loading = false;
        this.passError = e;
        this.toastr.error('Error while saving', 'Error', {
          positionClass: 'toast-bottom-center',
        });
      });

    } catch (e) {
      this.passError = e;
      this.toastr.error('Error while saving', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }

}