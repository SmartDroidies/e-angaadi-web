import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { Address } from '../../models/address';
import { UserdataService } from '../../service/userdata.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  addressForm!: FormGroup;
  loading!: boolean;
  editError!: any;
  addressData!: Address;
  id!: any;
  saveButton = true;

  constructor(private userdataService: UserdataService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.addressForm = this.fb.group({
      fullname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
          Validators.pattern("^[A-Za-z_]*$")
        ],
      ],
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern("^[0-9]*$")
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(250),
        ],
      ],
      area: [
        '',
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(250),
        ],
      ],
      landmark: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
      city: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern("^[A-Za-z0-9_]*$")]
      ],
      state: ['', [Validators.required,
      Validators.minLength(3)]
      ],
      pincode: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern("^[0-9]*$")]],
    });
  }

  ngOnInit(): void {
    this.editAddress();
  }

  get f() {
    return this.addressForm.controls;
  }


  editAddress() {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.saveButton = false;
        this.getIdAddress();
      }
    });
    this.initUser();
  }
  initUser() {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      this.addressForm.patchValue({ fullname: user.attributes.name });
      this.addressForm.patchValue({ phonenumber: user.attributes.phone_number });
    });
  }

  getIdAddress() {
    this.userdataService.getIdAddress(this.id).subscribe((address) => { this.addressForm.patchValue(address); });
  }

  onUpdate() {
    this.loading = true;
    if (this.addressForm.invalid) {
      return;
    }
    this.addressData = this.addressForm.value;
    this.addressData.id = this.id;
    this.userdataService.updateAddress(this.addressData).subscribe(
      () => {
        this.toastr.success('Address updated successfully', 'Updated', {
          positionClass: 'toast-bottom-center',
        });
        this.router.navigate(['/account/account-info/address']);
      },
      (error) => {
        this.toastr.error('Error while Upadting', 'Error', {
          positionClass: 'toast-bottom-center',
        });
        this.loading = false;
        this.editError = error;
      }
    );
  }

  onSave() {
    this.loading = true;
    if (this.addressForm.invalid) {
      return;
    }

    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      this.addressData = this.addressForm.value;
      this.userdataService.getAddress(user.attributes.name).subscribe((address: Address[]) => {
        if (address.length > 0) {
          this.addressData.default = false;
        } else {
          this.addressData.default = false;
        }
      });
      this.addressData.userId = user.attributes.name;
      this.userdataService.saveAddress(this.addressData).subscribe(
        () => {
          this.toastr.success('Address saved successfully', 'Saved', {
            positionClass: 'toast-bottom-center',
          });
          this.router.navigate(['/account/account-info/address']);
        },
        (error) => {
          this.toastr.error('Error while Saving', 'Error', {
            positionClass: 'toast-bottom-center',
          });
          this.loading = false;
          this.editError = error;
        }
      );
    });
  }

  async address() {
    await this.router.navigate(['/account/account-info/address']);
  }

}
