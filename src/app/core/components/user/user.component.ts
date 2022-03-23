/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  signedIn = false;
  mail: string | undefined;
  name: string | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    void this.initUser();
  }

  async initUser() {
    await Auth.currentAuthenticatedUser().then((user) => {
      if (user && user.attributes) {
        this.name = user.attributes.name as string;
        this.mail = user.attributes.email as string;
        this.signedIn = true;
      }
    });
  }

  async signIn() {
    await this.router.navigate(['/auth/sign-in']);
  }

  async signOut() {
    await Auth.signOut();
  }
}
