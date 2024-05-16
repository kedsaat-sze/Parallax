import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { SharedDataService } from "./shared-data.service";

@Injectable({
    providedIn: 'root'
})
    export class AuthGuardService {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (!SharedDataService.userId && !SharedDataService.email) {
            this.router.navigate(['home']);
            return false;
        }
        return true;
    }
}