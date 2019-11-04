import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advertiser } from '../interfaces/advertiser';
import { Address } from '../interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  advertisersUrl = 'https://arkham.cvtr.io/test/api/advertisers';
  addressesUrl = 'https://arkham.cvtr.io/test/api/addresses';
  addressesUrl2 = 'https://arkham.cvtr.io/test/api';

  constructor(
    private http: HttpClient
  ) {}

  getAdvertisersAPI(): Observable<HttpResponse<Advertiser[]>> {
    return this.http.get<Advertiser[]>(
      this.advertisersUrl, {observe: 'response'});
  }

  getAddressesAPI(address: string): Observable<HttpResponse<Address[]>> {
    return this.http.get<Address[]>(
      this.addressesUrl2 + address, {observe: 'response'});
  }
}
