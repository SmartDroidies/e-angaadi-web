import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { ToastrService, } from 'ngx-toastr';
import { from } from 'rxjs';
import { UserdataService } from '../../service/userdata.service'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  addressForm!: FormGroup;
  street!: string;
  saved = false;
  loading: boolean | undefined;
  error: boolean | undefined;
  name: string | undefined;
  phone_number: '' | undefined;
  constructor(
    private userdataService: UserdataService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.addressForm = this.fb.group({
      user: new FormControl(),
      contact: new FormControl(),
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
  setData() {
    this.addressForm.controls['user'].setValue(this.name);
    this.addressForm.controls['contact'].setValue(this.phone_number)
  }
  ngOnInit(): void {
    void this.initUser();
  }

  initUser() {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      if (user && user.attributes) {
        this.name = user.attributes.name as string;
        this.phone_number = user.attributes.phone_number;
      }
    });
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



