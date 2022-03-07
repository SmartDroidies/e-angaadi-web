import { Component, OnInit,OnDestroy,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit,OnDestroy {
  user: CognitoUserInterface | undefined;
  authState!: AuthState;


  constructor(private ref: ChangeDetectorRef,private router: Router) { }

  ngOnInit(): void {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
      if(this.authState == 'signedin') {
        this.router.navigate(['/home'])
      }
      console.log(this.authState)
      
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
