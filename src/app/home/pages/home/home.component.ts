import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  productGroupCode: string = '';

  setProductGroup(groupCode: string) {
    this.productGroupCode = groupCode;
  }
}
