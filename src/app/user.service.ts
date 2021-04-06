import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client, Product} from './product-service.service';

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
  urlClient = 'http://localhost:' + this.port + '/client';

  test = 'http://localhost:' + this.port + '/user1';

  httpOptions: any;
  headers: any;

  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public GetUserFromServerWithJwt(): Observable<User>{

    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', `Bearer ${sessionStorage.getItem('tokenJwt')}`);
    this.headers = this.headers.append('Content-Type', 'application/json');

    return this.httpClient.post<User>(this.test, null, {headers: this.headers});
  }

  public ChangeClientData(client: Client): Observable<any>{
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    this.headers = this.headers.append('Content-Type', `application/json`);

    return this.httpClient.patch<any>(this.urlClient, client, {observe: 'response', headers: this.headers});
  }

  public GetClient(): Observable<Client>{
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    this.headers = this.headers.append('Content-Type', `application/json`);

    return this.httpClient.get<Client>(this.urlClient,{ headers: this.headers});
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
  username?: string;
  password?: string;
  email?: string;
  codeVerification?: string;
  password1?: string;
  }

