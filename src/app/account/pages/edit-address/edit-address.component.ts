import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { ListStates } from 'src/app/auth/models/list-states';
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
  states!:ListStates;
  saveButton = true;
  title: string = 'Add Address';

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
          Validators.pattern("^[A-Za-z_ ]*$")
        ],
      ],
      countrycode:new FormControl({ value: '+91', disabled: true }),
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
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
          Validators.minLength(3),
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
      Validators.pattern("^[A-Za-z0-9_ ]*$")]
      ],
      state: ['', [Validators.required]
      ],
      pincode: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern("^[0-9]*$")]],
    });
  }

  ngOnInit(): void {
    this.editAddress();
    this.getStates();
    this.initUser();
  }

  get f() {
    return this.addressForm.controls;
  }
  
  getStates(){
    this.userdataService.getAllStates().subscribe(stateData =>{
      this.states = stateData;
    })
  }

  editAddress() {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.saveButton = false;
        this.title = 'Edit Address';
        this.getIdAddress();
      }
    });
  }

  initUser() {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      this.addressForm.patchValue({ fullname: user.attributes.name });
      const getPhonenumber=user.attributes.phone_number;
      const realNumber=getPhonenumber.slice(3, 13)
      this.addressForm.patchValue({ phonenumber: realNumber });
    });
  }

  getIdAddress() {
    this.userdataService.getIdAddress(this.id).subscribe((address) => {
    const getPhonenumber=address['phonenumber'].toString().slice(2, 12);
    address['phonenumber']= parseInt(getPhonenumber)
     this.addressForm.patchValue(address);
     });
  }

  onUpdate() {
    this.loading = true;
    if (this.addressForm.invalid) {
      return;
    }
    this.addressData = this.addressForm.value;
    this.addressData.id = this.id;
    this.addressData.phonenumber=91+this.addressForm.value.phonenumber;
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
      this.addressData.phonenumber=91+this.addressForm.value.phonenumber;
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
