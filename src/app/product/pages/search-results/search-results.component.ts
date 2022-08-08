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

  searchResults!: Product[];
  searchWord: string | null | undefined;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.searchWord = params.get('searchword');
      if (this.searchWord != null && this.searchWord != undefined) {
        this.searchData(this.searchWord);
      }
    });

  }

  searchData(searchWord: string) {
    this.productService.searchProduct(searchWord).subscribe((searchData) => (this.searchResults = searchData));
  }

}
