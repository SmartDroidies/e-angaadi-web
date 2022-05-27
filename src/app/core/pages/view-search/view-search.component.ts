import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/product/models/product';

@Component({
  selector: 'app-view-search',
  templateUrl: './view-search.component.html',
  styleUrls: ['./view-search.component.scss']
})
export class ViewSearchComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
  }

}
