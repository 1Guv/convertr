import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Advertiser } from '../interfaces/advertiser';
import { Address } from '../interfaces/address';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  advertisersUrl = 'https://arkham.cvtr.io/test/api/advertisers';
  addressesUrl = 'https://arkham.cvtr.io/test/api/addresses';
  addressesUrl2 = 'https://arkham.cvtr.io/test/api';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  getAdvertisersAPI(): Observable<HttpResponse<Advertiser[]>> {
    return this.http.get<Advertiser[]>(
      this.advertisersUrl, {observe: 'response'});
  }

  getAddressesAPI(address: string): Observable<HttpResponse<Address[]>> {
    return this.http.get<Address[]>(
      this.addressesUrl2 + address, {observe: 'response'});
  }

  postAdvertiserAPI(advertiser: Advertiser): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = advertiser;
    return this.http.post<any>(this.addressesUrl, data, {observe: 'response', headers})
      .pipe(
        catchError((err: any) => {
          console.log(err);
          this.handleError(err);
          return of(err);
        }),
        tap((res: any) => {
          // Getting HTTP response here
          console.log('API Response 1', res.message);
          this.handleError(res.message);
        }));
  }

  postAddressAPI(address: Address): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = address;
    return this.http.post<any>(this.addressesUrl, data, {observe: 'response', headers})
      .pipe(
        catchError((err: any) => {
          console.log(err);
          this.handleError(err);
          return of(err);
        }),
        tap((res: any) => {
          // Getting HTTP response here
          console.log('API Response 2', res.message);
          this.handleError(res.message);
        }));
  }

  private handleError(httpError: HttpErrorResponse | any) {
    console.log('handleError', httpError);
    this.snackBar.open(httpError, 'Close');
  }
}
