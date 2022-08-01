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
  street!: string;
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
        ],
      ],
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
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
  }

  getIdAddress() {
    this.userdataService.getIdAddress(this.id).subscribe((address) => this.addressData = address);
    console.log(this.addressData);
    this.addressForm.patchValue(this.addressData);
  }

  onUpdate() {
    this.loading = true;
    if (this.addressForm.invalid) {
      return;
    }
    this.addressData = this.addressForm.value;
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
