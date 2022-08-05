import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/auth/services/cognito.service';
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

  constructor(private cognitoService: CognitoService,private router: Router,private userdataService: UserdataService) {}

 
  ngOnInit(): void {
    this.initUser();
    this.getAddress();
  }

  async initUser() {
    const currentUser = await this.cognitoService.currentAuthenticatedUser()
    this.userId = currentUser.attributes.name;
  }
  
  async editAddress(){
   await this.router.navigate(['/account/account-info/edit-address']);
  }

  getAddress() {
    this.userdataService.getAddress(this.userId).subscribe((address: Address[]) => {
        return this.addressDatas=address;
    });
  }

}



