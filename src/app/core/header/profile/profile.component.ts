import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  mail = '';
  name = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initUser();
  }
  initUser() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.mail = user.attributes.email;
        this.name = user.attributes.user_name;
      })
  }
}
