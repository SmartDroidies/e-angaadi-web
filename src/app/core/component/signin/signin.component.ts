import { Component, OnInit,OnDestroy,ChangeDetectorRef } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit,OnDestroy {
  user: CognitoUserInterface | undefined;
  authState!: AuthState;


  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
