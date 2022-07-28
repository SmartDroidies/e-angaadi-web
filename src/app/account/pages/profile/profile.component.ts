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

  constructor(private cognitoService: CognitoService, private fb: FormBuilder, private toastr: ToastrService) {
    this.loading = false;
    this.user = {} as CognitoUser;
    this.EditForm = this.fb.group({
      firstname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
      phonenumber: new FormControl('', [Validators.required, Validators.minLength(4)]),
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
      (await this.cognitoService.updateUserAttributes(this.user)).toPromise()
        .then(() => {
          this.loading = false;
          this.toastr.success('Successfully saved', 'Success', {
            positionClass: 'toast-bottom-center',
          });
        })
    } catch (e) {
      this.editError = e;
      this.toastr.error('Error while Edit', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }
}
