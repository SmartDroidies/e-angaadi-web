import { Component, OnInit,OnDestroy,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit,OnDestroy {
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
