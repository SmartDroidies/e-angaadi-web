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
  @Input() authState: any;

  constructor(private router: Router) {}
  ngOnChanges(simplechanges: SimpleChanges) {
    console.log('simpleChanges', simplechanges['authState'].currentValue);
    if (simplechanges['authState'].currentValue == 'signedOut') {
      this.initUser();
      this.signedin = true;
    }
  }
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
