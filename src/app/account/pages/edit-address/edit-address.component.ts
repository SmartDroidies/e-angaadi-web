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
  error!: boolean;

  constructor(private userdataService: UserdataService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.addressForm = this.fb.group({
      address: [
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
          Validators.maxLength(100),
        ],
      ],
      city: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)]
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

    this.userdataService.updateAddress(this.addressForm.value).subscribe(
      () => {
        this.toastr.success('Product saved successfully', 'Success', {
          positionClass: 'toast-bottom-center',
        });
        return this.router.navigate(['/home/account-info']);
      },
      () => {
        this.toastr.error('Error while saving', 'Error', {
          positionClass: 'toast-bottom-center',
        });
        this.error = true;
        this.loading = false;
      }
    );
  }

  async address(){
       await this.router.navigate(['/account/account-info/address']);
  }
}
