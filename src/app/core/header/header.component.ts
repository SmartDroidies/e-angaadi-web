import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  myControl = new FormControl();
  products: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredProducts!: Observable<string[]>;

  ngOnInit() {
    this.filteredProducts = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.products.filter((products) => this._normalizeValue(products).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
