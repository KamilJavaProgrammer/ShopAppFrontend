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


  urlRegistration = 'http://localhost:' + this.port + '/registration';
  urlVerfication = 'http://localhost:' + this.port + '/verification';
  urlLogin = 'http://localhost:' + this.port + '/login';
  urlChangePassword = 'http://localhost:' + this.port + '/changePassword';
  urlRole = 'http://localhost:' + this.port + '/role';
  urlNameUser = 'http://localhost:' + this.port + '/name12';
  urlAddress = 'http://localhost:' + this.port + '/client/address';
  urlShopClient = 'http://localhost:' + this.port + '/shop/client';

  test = 'http://localhost:' + this.port + '/user';

  httpOptions: any;
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










  public GetClient(): Observable<Client>{
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    this.headers = this.headers.append('Content-Type', `application/json`);

    return this.httpClient.get<Client>(this.urlShopClient, { headers: this.headers});
  }









  public RegistrationUser(user: User): Observable<string>{
    return this.httpClient.post(this.urlRegistration, user, {responseType: 'text'});
  }

  public SendVerificationCode(user: User): Observable<string> {
    return this.httpClient.patch(this.urlVerfication, user, {responseType : 'text'});

  }

  public Login(user: User): Observable<string>{
    return this.httpClient.post(this.urlLogin, user, {responseType: 'text'});
  }



  public SendCodeForChangePassword(user: User): Observable<string>{
    return this.httpClient.patch(this.urlChangePassword, user, {responseType : 'text'});
  }

  public ChangePassword(user: User): Observable<string>{
    return this.httpClient.post(this.urlChangePassword, user, {responseType : 'text'});
  }

  public GetRolefromServer(user: User): Observable<string>{
    return this.httpClient.post(this.urlRole, user, {responseType: 'text'});
  }

  public GetNameOfUser(): Observable<string>{

    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    return this.httpClient.get(this.urlNameUser, {headers: this.headers, responseType: 'text'});
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

