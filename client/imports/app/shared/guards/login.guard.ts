import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {MeteorUserService} from "../services/meteor-user.service";
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

    constructor(private router: Router, private meteorUserService: MeteorUserService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.meteorUserService.getUserNow().pipe(map(user => {
            if(user != null) {
                this.router.navigate(['']);
            }
            return true;
        }));
    }
}