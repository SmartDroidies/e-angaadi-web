import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Address } from '../models/address';
import { setDefault } from '../models/setdefault';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http: HttpClient) { }

  getAddress(userId: string): Observable<Address[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<Address[]>(environment.orderBaseUrl + '/address', { params: params });
  }

  getIdAddress(id: any): Observable<Address> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<Address>(environment.orderBaseUrl + '/address', { params: params });
  }

  saveAddress(address: Address): Observable<Address> {
    return this.http.post<any>(environment.orderBaseUrl + '/address', address);
  }

  updateAddress(address: Address): Observable<Address> {
    return this.http.put<any>(environment.orderBaseUrl + '/address', address);
  }

  updateDefaultAddress(setDefault: setDefault): Observable<setDefault> {
    return this.http.put<setDefault>(environment.orderBaseUrl + '/address/default', setDefault);
  }

  deleteAddress(id: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.delete<any>(environment.orderBaseUrl + '/address', { params: params });
  }

  getAllStates(): Observable<any>{
    return this.http.get("assets/states/statelist.json");
  }
}


