import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HomeShopComponent} from './FrontMain/home-shop/home-shop.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {



  constructor(private router: Router, public jwtHelperService: JwtHelperService,
             ) { }


  DecodeJwt(): string{
   return this.jwtHelperService.decodeToken(sessionStorage.getItem('accessToken')).sub;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (sessionStorage.getItem('accessToken')) {
       if (!this.jwtHelperService.isTokenExpired(sessionStorage.getItem('accessToken'))){
         // this.homeShopComponent.account = 'Twoje konto';
         return true;

       }
    }
    else
    {
       this.router.navigate(['/shop', {outlets: {route4: ['logowanie']}}]);
       // this.homeShopComponent.account = 'Zaloguj się';
       return false;

    }


  }











  CheckExpirationDateToken(): boolean {

    if (sessionStorage.getItem('accessToken')) {
      if (!this.jwtHelperService.isTokenExpired(sessionStorage.getItem('accessToken'))){
        return  true;
      }
    }
    return false;
  }

}
