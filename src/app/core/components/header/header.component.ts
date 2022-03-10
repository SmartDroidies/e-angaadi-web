import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user: CognitoUserInterface | undefined;
  authState!: AuthState;
  constructor(private ref: ChangeDetectorRef, private router: Router) { }
  ngOnInit(): void {
    //FIXME - Use Auth.currentAuthenticatedUser()
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
      if (this.authState == 'signedin') {
        this.router.navigate(['/home'])
      }
      console.log(this.authState)
    });
  }
}



