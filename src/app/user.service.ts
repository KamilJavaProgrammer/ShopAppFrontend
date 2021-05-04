import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Client, Product} from './product-service.service';
import {ShopClient} from './client-service.service';
import {map} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  port = '8088';


  urlShopClient = 'http://localhost:' + this.port + '/shop/client';
  test = 'http://localhost:' + this.port + '/user';
  headers: any;


  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }



  public GetUserFromServerWithJwt(): Observable<User>{

    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', `Bearer ${sessionStorage.getItem('accessToken')}`);
    this.headers = this.headers.append('Content-Type', 'application/json');

    return this.httpClient.get<any>(this.test, {headers: this.headers, observe: 'response'})
      .pipe(map(value => {
        if (value.status === 200){
          console.log(value);
          return value.body.body;
        }
        else {
          throwError(error('Faul'));
        }
      }));
  }

  public ChangeShopClientAddress(shopClient: ShopClient): Observable<ShopClient>{
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', `Bearer ${sessionStorage.getItem('accessToken')}`);
    this.headers = this.headers.append('Content-Type', `application/json`);

    return this.httpClient.patch<any>(this.urlShopClient, shopClient, {observe: 'response', headers: this.headers})
      .pipe(map(response => {
        if (response.status === 200){
          return response.body.body;
        }
        else
        {
          throwError(error('Error'));
        }
      }));
  }


  public GetShopClient(): Observable<ShopClient>{

    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', `Bearer ${sessionStorage.getItem('accessToken')}`);
    this.headers = this.headers.append('Content-Type', 'application/json');

    return this.httpClient.get<any>(this.urlShopClient, {headers: this.headers, observe: 'response'})
      .pipe(map(value => {
        if (value.status === 200){
          console.log(value);
          return value.body.body;
        }
        else {
          throwError(error('Faul'));
        }
      }));
  }

}

export interface User{
  id?: string;
  username?: string;
  password?: string;
  email?: string;
  codeVerification?: string;
  password1?: string;
  shopClient?: ShopClient;
  authorization?: boolean;
  role?: string;

}

