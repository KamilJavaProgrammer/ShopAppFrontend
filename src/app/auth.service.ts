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

  constructor(private http: HttpClient) { }



  login(user: User): Observable<boolean> {
    return this.http.post<any>(this.urlLogin, user, {observe: 'response'}).
      pipe(map(value => {
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



  loginAdmin(user: User): Observable<boolean> {
    return this.http.post<any>(this.urlLoginAdmin, user, {observe: 'response'}).
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
