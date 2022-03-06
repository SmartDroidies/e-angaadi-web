import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { ProductGroup } from '../models/product-group';
import { PRODUCTS, PRODUCT_GROUPS } from './mock-all-products';

@Injectable({
  providedIn: 'root',
})
export class MockProductService {
  getProductGroups(): Observable<ProductGroup[]> {
    return of(PRODUCT_GROUPS);
  }

  getProducts(): Observable<Product[]> {
    return of(PRODUCTS);
  }
}
