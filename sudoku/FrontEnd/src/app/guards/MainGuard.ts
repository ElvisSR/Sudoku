import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
CookieService

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(private cookie:CookieService, private router:Router){
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
      let cookie = this.cookie.check('token');

      if(cookie){
          return true;
      }
      else{
          this.router.navigate(["/login"]);
      }
  }
}

