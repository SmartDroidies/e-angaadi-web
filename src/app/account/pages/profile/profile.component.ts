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
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading!: boolean;
  user!: CognitoUser;
  EditForm!: FormGroup;
  editError!: any;
  userAttributes!:CognitoUser;


  constructor(private cognitoService: CognitoService, private fb: FormBuilder, private toastr: ToastrService) {
    this.loading = false;
    this.user = {} as CognitoUser;
    this.EditForm = this.fb.group({
      username: new FormControl({ value: '', disabled: true }),
      firstname: new FormControl({ value: '', disabled: true }),
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
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

  async initUser() {

    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      this.userAttributes=user.attributes;
      this.EditForm.patchValue({ username: user.attributes.username });
      this.EditForm.patchValue({ firstname: user.attributes.name });
      this.EditForm.patchValue({ email: user.attributes.email });
      this.EditForm.patchValue({ phonenumber: user.attributes.phone_number });
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
      (await this.cognitoService.updateUserAttributes(this.user))
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

  public async VerifyEmail(): Promise<void> {
    this.loading = true;
    this.user.email = this.EditForm.value.email;

    if (this.EditForm.invalid) {
      return;
    }

    try {
      (await this.cognitoService.verifyUserAttribute(this.user))
      this.loading = false;
      this.toastr.success('Successfully Code Sent to mail', 'Success', {
        positionClass: 'toast-bottom-center',
      });
    } catch (e) {
      this.editError = e;
      this.toastr.error('Error while Sending code', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }

  // public async VerifyNumber(): Promise<void> {
  //   this.loading = true;
  //   this.user.phone_number = this.EditForm.value.phone_number;

  //   if (this.EditForm.invalid) {
  //     return;
  //   }

  //   try {
  //     (await this.cognitoService.verifyUserAttribute(this.user))
  //     this.loading = false;
  //     this.toastr.success('Successfully Code Sent to mobile number', 'Success', {
  //       positionClass: 'toast-bottom-center',
  //     });
  //   } catch (e) {
  //     this.editError = e;
  //     this.toastr.error('Error while Sending code to mobile number', 'Error', {
  //       positionClass: 'toast-bottom-center',
  //     });
  //   }
  // }

  // public async SubmitCode(): Promise<void> {
  //   this.loading = true;
  //   this.user.email = this.EditForm.value.email;
  //   this.user.phone_number = this.EditForm.value.phone_number;


  //   if (this.EditForm.invalid) {
  //     return;
  //   }

  //   try {
  //     (await this.cognitoService.verifyUserAttributeSubmit(this.user))
  //     this.loading = false;
  //     this.toastr.success('Successfully saved', 'Success', {
  //       positionClass: 'toast-bottom-center',
  //     });
  //   } catch (e) {
  //     this.editError = e;
  //     this.toastr.error('Error while Saving', 'Error', {
  //       positionClass: 'toast-bottom-center',
  //     });
  //   }
  // }
}
