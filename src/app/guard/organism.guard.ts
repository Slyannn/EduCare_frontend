import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../services/login.service";

@Injectable({
  providedIn: 'root'
})
export class OrganismGuard implements CanActivate {

  constructor(private login:LoginService, private route:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.login.isLoggedIn() && this.login.getUserRole() == 'ROLE_ORGANISM' || this.login.getUserRole() == 'ROLE_STUDENT'){
      return true;
    }

    this.route.navigate(['login']);
    return true;
  }

}
