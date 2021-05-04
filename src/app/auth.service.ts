import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  port = '8088';
  urlLogin = 'http://localhost:' + this.port + '/login';
  urlLoginAdmin = 'http://localhost:' + this.port + '/login/admin';
  urlRegistration = 'http://localhost:' + this.port + '/registration';
  urlVerfication = 'http://localhost:' + this.port + '/verification';



  constructor(private httpClient: HttpClient) { }

  public RegistrationUser(user: User): Observable<boolean>{
    return this.httpClient.post<any>(this.urlRegistration, user, {observe: 'response'}).pipe(map(response => {

      if (response.status === 201){
        return true;
      }
      else if (response.status === 200){
        return false;
      }
    }));
  }


  public SendVerificationCode(user: User): Observable<boolean>{
    return this.httpClient.patch<any>(this.urlVerfication, user, {observe: 'response'}).pipe(map(response => {

      if (response.status === 201){
        return true;
      }
      else if (response.status === 401){
        return false;
      }
    }));
  }



  LoginUser(user: User): Observable<boolean> {
    return this.httpClient.post<any>(this.urlLogin, user, {observe: 'response'}).

    pipe(map(value => {
      console.log('dupcuje serwisanata');

      if (value.body.statusCodeValue === 202){
        sessionStorage.setItem('accessToken', value.body.body);
        return true;
      }
      else
      {
        return false;
      }
    }));
  }





  //
  // LoginUser(user: User): Observable<boolean> {
  //   return this.httpClient.post<any>(this.urlLogin, user, {observe: 'response'}).
  //
  //     pipe(map(value => {
  //       console.log('!');
  //       console.log(value);
  //       if (value.body.statusCodeValue === 202){
  //           sessionStorage.setItem('accessToken', value.body.body);
  //           return true;
  //        }
  //        else
  //        {
  //          return false;
  //        }
  //     }));
  // }



  loginAdmin(user: User): Observable<boolean> {
    return this.httpClient.post<any>(this.urlLoginAdmin, user, {observe: 'response'}).
    pipe(map(value => {
      console.log(value);
      if (value.body.statusCodeValue === 202){
        sessionStorage.setItem('adminAccessToken', value.body.body);
        return true;
      }
      else
      {
        return false;
      }
    }));
  }


  logout(): void {
    localStorage.removeItem('accessToken');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('accessToken') !== null);
  }
}
