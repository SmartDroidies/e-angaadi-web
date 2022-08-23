/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { CognitoUser } from 'src/app/auth/models/cognito-user';
import { CognitoService } from 'src/app/auth/services/cognito.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  loading!: boolean;
  user!: CognitoUser;
  EditForm!: FormGroup;
  editError!: any;
  userAttributes!: CognitoUser;

  constructor(private cognitoService: CognitoService, private fb: FormBuilder, private toastr: ToastrService) {
    this.loading = false;
    this.user = {} as CognitoUser;
    this.EditForm = this.fb.group({
      username: new FormControl({ value: null, disabled: true }),
      firstname: new FormControl({ value: null, disabled: true }),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      phonenumber: new FormControl('', [Validators.required, Validators.minLength(4)]),
      code: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.initUser();
  }

  get f() {
    return this.EditForm.controls;
  }

  async initUser(): Promise<void> {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      this.userAttributes = user.attributes;
      this.EditForm.patchValue({ username: user.username });
      this.EditForm.patchValue({ firstname: this.userAttributes.name });
      this.EditForm.patchValue({ email: this.userAttributes.email });
      this.EditForm.patchValue({ phonenumber: this.userAttributes.phone_number });
    });
  }

  public async editUserData(): Promise<void> {
    this.loading = true;
    this.user.firstname = this.EditForm.value.firstname;
    this.user.email = this.EditForm.value.email;
    this.user.phone_number = this.EditForm.value.phonenumber;

    if (this.EditForm.invalid) {
      return;
    }

    try {
      await this.cognitoService.updateUserAttributes(this.user);
      this.loading = false;
      this.toastr.success('Successfully saved', 'Success', {
        positionClass: 'toast-bottom-center',
      });
    } catch (e) {
      this.editError = e;
      this.toastr.error('Error while Edit', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }
}
