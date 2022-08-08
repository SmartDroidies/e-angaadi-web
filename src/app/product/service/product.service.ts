import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductGroup } from '../models/product-group';
import { Product } from '../models/product';
import { ProductImage } from '../models/product-image';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductGroups(): Observable<ProductGroup[]> {
    return this.http.get<ProductGroup[]>(environment.productBaseUrl + '/group');
  }

  getProducts(type: string): Observable<Product[]> {
    let params = new HttpParams();
    params = params.append('type', type);
    return this.http.get<Product[]>(environment.productBaseUrl + '/item', { params: params });
  }

  getProduct(code: string, type: string): Observable<Product> {
    let params = new HttpParams();
    params = params.append('code', code);
    params = params.append('type', type);
    return this.http.get<Product>(environment.productBaseUrl + '/item', { params: params });
  }

  searchProduct(search: string): Observable<Product> {
    let params = new HttpParams();
    params = params.append('search', search);
    return this.http.get<Product>(environment.productBaseUrl + '/search', { params: params });
  }

  getProductImages(): Observable<ProductImage[]> {
    return this.http.get<ProductImage[]>(environment.productBaseUrl + '/image');
  }
}
