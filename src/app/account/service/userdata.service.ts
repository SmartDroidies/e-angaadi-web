import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http: HttpClient) { }

  getAddress(userId: string): Observable<Address[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<Address[]>(environment.productBaseUrl + '/user-info', { params: params });
  }

  addAddress(address: Address): Observable<Address> {
    return this.http.post<any>(environment.productBaseUrl + '/user-info', address);
  }

}


