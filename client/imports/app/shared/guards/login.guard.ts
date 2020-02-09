import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { MeteorUserService } from '../services/meteor-user.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private meteorUserService: MeteorUserService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.meteorUserService.getUserNow().pipe(
      map(user => {
        if (user != null) {
          this.router.navigate(['']);
        }
        return true;
      })
    );
  }
}
