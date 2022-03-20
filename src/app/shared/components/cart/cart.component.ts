import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(private router: Router) {}

  async onCart() {
    await this.router.navigate(['/cart']);
  }
}


//FIXME - Barani use Mat Dialog
//FIXME - Barani use Mat List  