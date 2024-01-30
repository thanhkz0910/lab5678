import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isLoggedIn()) {
      const userRole = this.userService.getRole();
      if (userRole === 'admin') {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
