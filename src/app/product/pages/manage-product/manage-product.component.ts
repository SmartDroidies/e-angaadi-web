import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent {
  productGroupCode = '';

  setProductGroup(groupCode: string) {
    this.productGroupCode = groupCode;
  }
}
