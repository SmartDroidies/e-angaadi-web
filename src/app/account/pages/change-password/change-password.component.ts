import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  name: string | undefined;
  constructor(private fb: FormBuilder, private toastr: ToastrService,) {
    this.initUser();
    this.passwordForm = this.fb.group({
      user: new FormControl(),
      oldPassword: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"),
        ]
      ),
      newPassword: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"),
          Validators.minLength(8), Validators.maxLength(10)
        ],

      ),
    });
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

  ngOnInit(): void {
    void this.initUser();
  }

  initUser() {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      if (user && user.attributes) {
        this.name = user.attributes.name as string;
      }
    });
  }
  async onChangePassword() {

    if (this.passwordForm.invalid) {
      return;
    } 

    try {
      const user = await Auth.currentAuthenticatedUser()
      let Values = this.passwordForm.value;
      this.oldPassword = Values.oldPassword;
      this.newPassword = Values.newPassword;
      return await Auth.changePassword(user, this.oldPassword, this.newPassword);

    } catch (e) {
      this.toastr.error('Error while saving', 'Error', {
        positionClass: 'toast-bottom-center',
      });
      return false;
    }

  }

}



//FIXME 
// Dont make server call when the validation fails
// Use flex layout for alignment
// Create Mixin