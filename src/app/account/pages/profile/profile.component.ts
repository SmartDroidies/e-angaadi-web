import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { from } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  email!: string;
  name!: string;
  phone_number!: number;
  

  ngOnInit(): void {
    void this.initUser();
  }

  initUser() {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      if (user && user.attributes) {
        this.name = user.attributes.name as string;
        this.email = user.attributes.email as string;
        this.phone_number = user.attributes.phone_number;
      }
    });
  }

}
