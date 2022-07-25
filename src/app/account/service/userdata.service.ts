import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http: HttpClient) { }

  updateAddress(address: Address): Observable<any> {
    return this.http.post<any>(environment.productBaseUrl + '/user-info', address);
  }
}


