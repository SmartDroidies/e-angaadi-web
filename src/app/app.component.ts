import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'E-Angaadi';
  // user: CognitoUserInterface | undefined;
  // authState!: AuthState;

  constructor() {}

  ngOnInit() {
    // onAuthUIStateChange((authState, authData) => {
    //   this.authState = authState;
    //   this.user = authData as CognitoUserInterface;
    //   this.ref.detectChanges();
    // });
  }

  // ngOnDestroy() {
  //   return onAuthUIStateChange;
  // }
}
