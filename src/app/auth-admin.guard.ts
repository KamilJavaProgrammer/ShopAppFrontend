import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private router: Router, public jwtHelperService: JwtHelperService,
  ) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (sessionStorage.getItem('adminAccessToken')) {
      if (!this.jwtHelperService.isTokenExpired(sessionStorage.getItem('adminAccessToken'))){
        return true;

      }
    }
    else
    {
      console.log('chuj');
      console.log('chuj');
      console.log('chuj');
      this.router.navigate(['/admin/logowanie']);

      return false;

    }
  }

}
