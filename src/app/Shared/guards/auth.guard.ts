import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, @Inject('LOCALSTORAGE') private localStorage: any) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorage.getItem('token')) {
      return (state.url.startsWith('/users/edit-profile')) ? true : (this.router.navigate(['/']), false);
    } else {
      return (state.url.startsWith('/users/edit-profile')) ? (this.router.navigate(['/']), false) : true;
    }
  }

}
