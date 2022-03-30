import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { from } from 'rxjs';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent  {
  mail: string | undefined;
  constructor(private router: Router) { }


 async personalInformation() {
    from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      if (user && user.attributes) {
        this.mail = user.attributes.email as string;
      }
    });
  await this.router.navigate(['/home/account-info']);
  }
}
