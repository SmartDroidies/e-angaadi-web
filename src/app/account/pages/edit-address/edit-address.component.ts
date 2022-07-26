import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private userdataService: UserdataService,
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
  }

  get f() {
    return this.addressForm.controls;
  }


  onSave() {
    this.loading = true;
    if (this.addressForm.invalid) {
      return;
    }
    try {
      this.userdataService.updateAddress(this.addressForm.value).subscribe()
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
