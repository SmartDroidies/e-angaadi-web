import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/auth/services/cognito.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  name!: string;
  email!: string;
  phone_number!: number;


  constructor(private cognitoService: CognitoService,private router: Router) {}

 
  ngOnInit(): void {
    this.initUser();
  }

  async initUser() {
    const currentUser = await this.cognitoService.currentAuthenticatedUser()
    this.name = currentUser.attributes.name;
    this.email = currentUser.attributes.email;
    this.phone_number = currentUser.attributes.phone_number;
  }
  
  async editAddress(){
   await this.router.navigate(['/account/account-info/edit-address']);
  }

}



