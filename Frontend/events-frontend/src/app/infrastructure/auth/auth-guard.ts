import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {AuthService} from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole: string = this.authService.user$.getValue();

    if (userRole == null || !route.data['role'].includes(userRole)) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

}
