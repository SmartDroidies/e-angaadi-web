import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  signedin: boolean = false;
  mail = '';
  name = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initUser();
  }
  initUser() {
    Auth.currentAuthenticatedUser().then((user) => {
      this.name = user.attributes.name;
      this.mail = user.attributes.email;
      this.signedin = true;
    });
  }

  signIn() {
    this.router.navigate(['/auth/sign-in']);
  }
}
