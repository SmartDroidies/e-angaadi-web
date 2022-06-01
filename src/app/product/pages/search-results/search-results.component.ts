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

  searchResults!:Product[];
  searchword:any;

  constructor(private productService: ProductService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.searchword = params.get('searchword');
      this.searchData(this.searchword);
    });
    
  }

  searchData(searchword:any) {
   this.productService.searchProduct(searchword).subscribe((searchDatas) => (this.searchResults = searchDatas));
  }

}
