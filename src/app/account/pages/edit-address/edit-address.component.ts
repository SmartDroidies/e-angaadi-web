import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CognitoService } from 'src/app/auth/services/cognito.service';
import { Address } from '../../models/address';
import { UserdataService } from '../../service/userdata.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {

  addressForm!: FormGroup;
  street!: string;
  loading!: boolean;
  editError!: any;
  userId!: string;
  addressData!:Address;

  constructor(private userdataService: UserdataService,
    private cognitoService: CognitoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.addressForm = this.fb.group({
      fullname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
        ],
      ],
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(200),
        ],
      ],
      area: [
        '',
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(200),
        ],
      ],
      landmark: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
        ],
      ],
      city: ['', [Validators.required,
      Validators.minLength(3)]
      ],
      state: ['', [Validators.required,
      Validators.minLength(3)]
      ],
      pincode: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6)]],
    });
  }

  ngOnInit(): void {
    this.initUser();
    this.editAddress();
  }

  get f() {
    return this.addressForm.controls;
  }

  async initUser() {
    const currentUser = await this.cognitoService.currentAuthenticatedUser()
    this.userId = currentUser.attributes.name;
  }

  editAddress() {
    this.userdataService.getAddress(this.userId).subscribe((address: Address[]) => {
        return this.addressForm.patchValue(address);
    });
  }

  onSave() {
    this.loading = true;
    if (this.addressForm.invalid) {
      return;
    }
    try {
      this.addressData=this.addressForm.value;
      this.addressData.userid=this.userId;
      this.userdataService.addAddress(this.addressData).subscribe()
      this.toastr.success('Product saved successfully', 'Success', {
        positionClass: 'toast-bottom-center',
      });
      return this.router.navigate(['/home/account-info']);
    } catch (e) {
      this.editError = e;
      this.toastr.error('Error while saving', 'Error', {
        positionClass: 'toast-bottom-center',
      });
      this.loading = false;
    }
    return false;
  }

  async address() {
    await this.router.navigate(['/account/account-info/address']);
  }
}
