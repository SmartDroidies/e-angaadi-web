import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})

export class SearchComponent { 
  searchword!: string;

  constructor(private router: Router) { }

  async searchData(searchword:string){
    if(searchword){
    await this.router.navigate(['/product/search',searchword]);
    }
  }
}
