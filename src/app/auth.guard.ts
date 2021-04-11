import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {



  constructor(private router: Router, public jwtHelperService: JwtHelperService) { }


  DecodeJwt(): string{
   return this.jwtHelperService.decodeToken(localStorage.getItem('accessToken')).sub;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (localStorage.getItem('accessToken')) {
       if (!this.jwtHelperService.isTokenExpired(localStorage.getItem('accessToken'))){
         return  true;
       }
    }

    this.router.navigate(['/shop', {outlets: {route4: ['logowanie']}}]);
    return false;
  }

}