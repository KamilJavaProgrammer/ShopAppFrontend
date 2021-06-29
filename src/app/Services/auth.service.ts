import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from './user.service';
import {Router} from '@angular/router';
import {Role} from '../Enums/role.enum';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public static ADDRESS_SERVER = '******';
     private headers: HttpHeaders;
      public JSON_CONTENT_TYPE = 'application/json';
     urlLogin = AuthService.ADDRESS_SERVER + '/users/login';
     urlLoginAdmin = AuthService.ADDRESS_SERVER + '/users/login/admin';
     urlRegistration = AuthService.ADDRESS_SERVER + '/users/registration';
     urlVerfication = AuthService.ADDRESS_SERVER + '/users/verification';
     urlPassword = AuthService.ADDRESS_SERVER + '/users/passwords';


     constructor(private httpClient: HttpClient, private router: Router) { }


  public SetJWTToken(userRole: Role, contentType: string): HttpHeaders{

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', contentType);

    if (userRole === Role.ADMIN)
    {
      this.headers = this.headers.append('Authorization', `Bearer ${sessionStorage.getItem('adminAccessToken')}`);
    }
    else
    {
      this.headers = this.headers.append('Authorization', `Bearer ${sessionStorage.getItem('accessToken')}`);
    }
    return  this.headers;
  }



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
        sessionStorage.clear();
        sessionStorage.setItem('accessToken', response.body.message);
      }
      return response.body.status;
    }));
  }

  loginAdmin(user: User): Observable<boolean> {

    return this.httpClient.post<any>(this.urlLoginAdmin, user, {observe: 'response'}).
    pipe(map(value => {
      if (value.body.status === 200){

        sessionStorage.clear();
        sessionStorage.setItem('adminAccessToken', value.body.message);


        return true;
      }
      else
      {
        return false;
      }
    }));
  }




  ChangePassword(user: User): Observable<boolean> {
    return this.httpClient.patch<any>(this.urlPassword, user, {observe: 'response'}).
    pipe(map(value => {
      return value.status === 200;
    }));
  }


  SendUserEmail(email: string): Observable<boolean> {
    return this.httpClient.post<any>(this.urlPassword, email, {observe: 'response'}).
    pipe(map(value => {
      return value.status === 200;
    }));
  }

  CodeVerificationHandle(user: User, callback): void{
     const result = prompt('Podaj kod weryfikacyjny wysłany na adres e-mail');

     if (result != null) {
      user.codeVerification = result;

      this.ChangePassword(user).subscribe(response => {
        if (response === true) {
          alert('Udało się! Zaloguj się!');
          this.router.navigate(['/shop', {outlets: {route4: ['logowanie']}}]);
        }
        else {
          alert('Wpisz kod!');
          callback();
        }
      });
    }
    else {
      alert('Wpisz kod!');
    }
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


  public getIPAddress(): Observable<any>
  {
    return this.httpClient.get<any>('http://api.ipify.org/?format=json');

  }

}


