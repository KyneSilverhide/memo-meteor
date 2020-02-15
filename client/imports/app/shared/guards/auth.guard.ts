import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MeteorUserService } from '../services/meteor-user.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private meteorUserService: MeteorUserService) {
    /**/
  }

  canActivate(): Observable<boolean> {
    return this.meteorUserService.getUserNow().pipe(
      map(user => {
        if (user != null) {
          return true;
        }
        this.router.navigate(['login']);
        return false;
      })
    );
  }
}
