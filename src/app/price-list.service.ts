import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {ProductBasket} from './order.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  headers: HttpHeaders;
  port = '8088';
  urlPriceList = 'http://localhost:' + this.port + '/pricelist';

  constructor(private httpClient: HttpClient) { }


  public GetAllPriceList(): Observable<any>{
    this.headers = new HttpHeaders();
    return this.httpClient.get<any>(this.urlPriceList, {headers: this.headers, observe: 'response'}).pipe(map(value => {
      return value.body.body;
    }));
  }

}

export interface ServicePriceList {
    id?: number;
    category?: string;
    name?: string;
    price?: number;

}


