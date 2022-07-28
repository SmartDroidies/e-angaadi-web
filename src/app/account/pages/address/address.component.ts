import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
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

  constructor(private router: Router,private userdataService: UserdataService) {}

 
  ngOnInit(): void {
    this.getAddress();
  }
  
  async editAddress(){
   await this.router.navigate(['/account/account-info/edit-address']);
  }

  getAddress() {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
        this.userdataService.getAddress(user.attributes.name).subscribe((address: Address[]) => {
        return this.addressDatas=address;
      });
    });
  }

}



