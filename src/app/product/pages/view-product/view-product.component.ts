import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit {
  showCategoryList!: boolean;
  productGroupCode = ' ';


  ngOnInit(): void {
    this.showCategoryList = true;
  }


  setProductGroup(groupCode: string) {
    this.productGroupCode = groupCode;
    this.showCategoryList = false;
    return this.showCategoryList;
  }
}
