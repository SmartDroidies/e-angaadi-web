import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { Address } from '../../models/address';
import { UserdataService } from '../../service/userdata.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  userId!: string;
  addressDatas!:Address[];
  editError!: any;
  loading!: boolean;

  constructor(private router: Router,private userdataService: UserdataService, private toastr: ToastrService) {}

 
  ngOnInit(): void {
    this.getAddress();
  }
  
  async editAddress(id:string){
   await this.router.navigate(['/account/account-info/modify',id]);
  }

  async newAddress(){
    await this.router.navigate(['/account/account-info/edit-address']);
   }

  getAddress() {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
        this.userdataService.getAddress(user.attributes.name).subscribe((address: Address[]) => {
        return this.addressDatas=address;
      });
    });
  }

  onDelete(id:string){
    this.userdataService.deleteAddress(id).subscribe(
      () => {
        this.toastr.success('Deleted successfully', 'Deleted', {
          positionClass: 'toast-bottom-center',
        });
        this.getAddress();
      },
      (error) => {
        this.toastr.error('Error while Deleting', 'Error', {
          positionClass: 'toast-bottom-center',
        });
        this.loading = false;
        this.editError = error;
      }
    );
  }


}



