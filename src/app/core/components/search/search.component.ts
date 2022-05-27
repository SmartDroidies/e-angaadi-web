import { Component } from '@angular/core';
import { Product } from 'src/app/product/models/product';
import { ProductService } from 'src/app/product/service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})

export class SearchComponent {

  search!: string;
  searchedDatas!:Product[];

  constructor(private productService: ProductService) { }

  searchData() {
   this.productService.searchProduct(this.search).subscribe((searchDatas) => (this.searchedDatas = searchDatas));
  }
}
