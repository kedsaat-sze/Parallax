import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { SharedDataService } from "./shared-data.service";

@Injectable({
    providedIn: 'root'
})
    export class AuthGuardService implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!SharedDataService.userId && !SharedDataService.email) {
            this.router.navigate(['home']);
            return false;
        }
        return true;
    }
}