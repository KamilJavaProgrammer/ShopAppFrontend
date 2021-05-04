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

      if (response.body.status === 201){
        return true;
      }
      else if (response.body.status === 200){
        return false;
      }
    }));
  }


  public SendVerificationCode(user: User): Observable<boolean>{
    return this.httpClient.patch<any>(this.urlVerfication, user, {observe: 'response'}).pipe(map(response => {

      if (response.body.status === 201){
        return true;
      }
      else if (response.body.status === 401){
        return false;
      }
    }));
  }



  LoginUser(user: User): Observable<number> {
    return this.httpClient.post<any>(this.urlLogin, user, {observe: 'response'}).pipe(map(response => {

      if (response.body.status === 200)
      {
        sessionStorage.setItem('accessToken', response.body.message);
      }
      return response.body.status;
    }));
  }

  loginAdmin(user: User): Observable<boolean> {
    return this.httpClient.post<any>(this.urlLoginAdmin, user, {observe: 'response'}).
    pipe(map(value => {
      if (value.body.status === 200){
        sessionStorage.setItem('adminAccessToken', value.body.message);
        return true;
      }
      else
      {
        return false;
      }
    }));
  }


  logout(): void {
    sessionStorage.removeItem('accessToken');
  }
  LogoutAdmin(): void {
    sessionStorage.removeItem('adminAccessToken');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('accessToken') !== null);
  }
}
