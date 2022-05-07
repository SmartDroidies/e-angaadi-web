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
  oldPassword!: any;
  newPassword!: any;
  showPassword = false;
  name: string | undefined;
  constructor(private fb: FormBuilder, private toastr: ToastrService,) {
    this.initUser();
    this.passwordForm = this.fb.group({
      user: new FormControl(),
      oldPassword: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern("^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{8,255})\\S$"),
        ]
      ),
      newPassword: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern("^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{8,255})\\S$"),
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
  toggleShowPassword(showBoolean: boolean) {
    showBoolean = !showBoolean;
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



