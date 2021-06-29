import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ShopClient} from './client-service.service';
import {map} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';
import {Message} from './message.service';
import {AuthService} from './auth.service';
import {Role} from '../Enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlShopClient = AuthService.ADDRESS_SERVER + '/shopClients';
  test = AuthService.ADDRESS_SERVER + '/users/auth';
  urlUsersAll = AuthService.ADDRESS_SERVER + '/users/all';
  test2 = AuthService.ADDRESS_SERVER + '/names';
  urlNewsletter = AuthService.ADDRESS_SERVER + '/news';



  constructor(private httpClient: HttpClient, private authService: AuthService) {}


  public AddNewSubscriber(email: string): Observable<any>{

    return this.httpClient.post(this.urlNewsletter, email, {observe: 'response'}).pipe(map(value => {
          return value;
    }));
  }


  public GetUserFromServerWithJwt(role: Role): Observable<User>{


    return this.httpClient.get<any>(this.test, {headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(response => {
        if (response.status === 200){
          return response.body;
        }
        else {
          throwError(error('error'));
        }
      }));
  }



    GetAdminData(role: Role): Observable<User>{


    return this.httpClient.get<any>(this.test, {headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(  value => {
        console.log(value);
        if (value.status === 200){
          return value.body;
        }
        else {
          throwError(error('Faul'));
        }
      }));
  }

  GetAllUsers(role: Role): Observable<Array<User>>{

    return this.httpClient.get<any>(this.urlUsersAll, {headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(  value => {
        console.log(value);
        if (value.status === 200){
          return value.body;
        }
        else {
          throwError(error('Faul'));
        }
      }));
  }



  public ChangeShopClientAddress(shopClient: ShopClient, role: Role): Observable<ShopClient>{

    return this.httpClient.patch<any>(this.urlShopClient, shopClient, {headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE), observe: 'response'} )
      .pipe(map(response => {
        if (response.status === 200){
          return response.body;
        }
        else
        {
          throwError(error('Error'));
        }
      }));
  }


  public GetShopClient(role: Role): Observable<ShopClient>{


    return this.httpClient.get<any>(this.urlShopClient, {headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(response => {
        if (response.status === 200){
          return response.body;
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
  changedPassword?: string;
  shopClient?: ShopClient;
  authorization?: boolean;
  role?: string;
  messages?: Array<Message>;

}

