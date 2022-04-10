import { Component } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService, } from 'ngx-toastr';
import { UserdataService } from '../../../shared/service/userdata.service'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  addressForm!: FormGroup;
  street!: string;
  saved = false;
  loading: boolean|undefined;
  error: boolean|undefined;
  constructor(
    private userdataService: UserdataService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.addressForm = this.fb.group({
      street: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
          Validators.pattern('^[A-Za-z ]+([A-Za-z ]+)*$'),
        ],
      ],
      landmark: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern('^[A-Za-z ]+([A-Za-z ]+)*$'),
        ],
      ],
      city: ['', Validators.required],
    });
  }

  get f() {
    return this.addressForm.controls;
  }
  

  
  onSave() {
    this.saved = true;

    // stop here if form is invalid
    if (this.addressForm.invalid) {
      return;
    }

    this.loading = true;

    
    this.userdataService.updateProduct(this.addressForm.value).subscribe(
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
        this.saved = false;
        this.error = true;
        this.loading = false;
      }
    );
  }
}



