import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'E-Angaadi';
  user: CognitoUserInterface | undefined;
  authState: AuthState | undefined;
  loggedIn: Observable<boolean> = of(false);
  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;

      this.user = authData as CognitoUserInterface;
      if (this.authState === AuthState.SignedIn) {
        // console.log("User Logged in : ", this.authState);
        this.loggedIn = of(true);
        // console.log("User Data : ", this.user);
        this.ref.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
