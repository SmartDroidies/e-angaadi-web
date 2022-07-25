import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService, } from 'ngx-toastr';
import { CognitoService } from 'src/app/auth/services/cognito.service';
import { UserdataService } from '../../service/userdata.service'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  name!: string;
  email!: string;
  phone_number!: number;
  addressForm!: FormGroup;
  street!: string;
  loading!: boolean;
  error!: boolean;


  constructor(
    private userdataService: UserdataService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private cognitoService: CognitoService) {
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

  get f() {
    return this.addressForm.controls;
  }

  ngOnInit(): void {
    void this.initUser();
  }

  async initUser() {
    let currentUser = await this.cognitoService.currentAuthenticatedUser()
    this.name = currentUser.attributes.name;
    this.email = currentUser.attributes.email;
    this.phone_number = currentUser.attributes.phone_number;
  }



  onSave() {
    this.loading = true;
    if (this.addressForm.invalid) {
      return;
    }

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
        this.error = true;
        this.loading = false;
      }
    );
  }
}



