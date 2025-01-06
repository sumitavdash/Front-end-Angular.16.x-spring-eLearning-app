import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class  NormalGuard implements CanActivate {

  constructor(private  login:LoginService, private router: Router)
   {

   }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): 
    
    Observable<boolean 
    | UrlTree> 
    | Promise<boolean 
    | UrlTree> 
    | boolean 
    | UrlTree {
      console.log('NormalGuard: Checking access...');
     if(this.login.isLoggedIn() && this.login.getUserRole()==='General USER'){
      console.log('NormalGuard: Access granted.');
      return true;
     }
     console.log('NormalGuard: Access denied. Redirecting to login...');
    //navigation without reloading
       this.router.navigate(['login']);
      return false;
     
  }
}
