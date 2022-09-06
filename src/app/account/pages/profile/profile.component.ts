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
  panelOpenState = false;

  constructor(private cognitoService: CognitoService, private fb: FormBuilder, private toastr: ToastrService) {
    this.loading = false;
    this.user = {} as CognitoUser;
    this.EditForm = this.fb.group({
      username: new FormControl({ value: null, disabled: true }),
      firstname: new FormControl({ value: null, disabled: true }),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      // eslint-disable-next-line @typescript-eslint/unbound-method
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("^[0-9]*$")
        ],
      ],
      countrycode: new FormControl({ value: '+91', disabled: true }),
      code:[""],
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
      const getPhonenumber = user.attributes.phone_number;
      const realNumber = getPhonenumber.slice(3, 13)
      this.EditForm.patchValue({ phonenumber: realNumber });
    });
  }

  public async editUserData(): Promise<void> {
    this.loading = true;
    this.user.firstname = this.EditForm.value.firstname;
    this.user.email = this.EditForm.value.email;
    this.EditForm.value.phonenumber = '+91' + this.EditForm.value.phonenumber;
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

  public async verifyUserAttr(): Promise<void> {
    this.loading = true;
    this.user.email = this.EditForm.value.email;
    this.EditForm.value.phonenumber = '+91' + this.EditForm.value.phonenumber;
    this.user.phone_number = this.EditForm.value.phonenumber;

    if (this.EditForm.invalid) {
      return;
    }

    try {
      await this.cognitoService.verifyUserAttribute(this.user);
      this.loading = false;
      this.toastr.success('Successfully code sent', 'Success', {
        positionClass: 'toast-bottom-center',
      });
    } catch (e) {
      this.editError = e;
      this.toastr.error('Error while sending code', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }


  public async verifyUserAttrSubmit(): Promise<void> {
    this.loading = true;
    this.user.email = this.EditForm.value.email;
    this.EditForm.value.phonenumber = '+91' + this.EditForm.value.phonenumber;
    this.user.phone_number = this.EditForm.value.phonenumber;
    this.user.code=this.EditForm.value.code;


    if (this.EditForm.invalid) {
      return;
    }

    try {
      await this.cognitoService.verifyUserAttributeSubmit(this.user);
      this.loading = false;
      this.toastr.success('Successfully verified', 'Success', {
        positionClass: 'toast-bottom-center',
      });
    } catch (e) {
      this.editError = e;
      this.toastr.error('Error while verifying', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }
}
