import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchedDatas!:Product[];
  search!:string

  constructor(private productService: ProductService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((search) => {
      this.searchData(search);
    });
    
  }

  searchData(search:any) {
   this.productService.searchProduct(search).subscribe((searchDatas) => (this.searchedDatas = searchDatas));
  }

}
