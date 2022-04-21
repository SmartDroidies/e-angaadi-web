import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { from } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  mail: string | undefined;
  name: string | undefined;
  phone_number: '' | undefined;
  

  ngOnInit(): void {
    void this.initUser();
  }

  initUser() {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      if (user && user.attributes) {
        this.name = user.attributes.name as string;
        this.mail = user.attributes.email as string;
        this.phone_number = user.attributes.phone_number;
      }
    });
  }

}
