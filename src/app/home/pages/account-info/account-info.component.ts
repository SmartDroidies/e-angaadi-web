import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent {
  constructor(private router: Router) {}

  async personalInformation() {
    await this.router.navigate(['/home/account-info/profile']);
  }
  async address() {
    await this.router.navigate(['/home/account-info/address']);
  }
}
