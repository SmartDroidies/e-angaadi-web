import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: CognitoUserInterface | undefined;
  authState!: AuthState;
  constructor(private ref: ChangeDetectorRef, private router: Router) {}
  ngOnInit(): void {

    Auth.currentAuthenticatedUser().then((user) => {
      console.log("Auth User state :" , user);  
    });

  }
}
