import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { defer, Observable, tap } from 'rxjs';
import { CognitoService } from '../auth/services/cognito.service';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private cognitoService: CognitoService
    ) {}

     canActivate(): Observable<boolean> {
        return  defer(() => this.cognitoService.isAuthenticated())
        .pipe(
          tap(loggedIn => {
            if (!loggedIn) {
              this.router.navigate(['/auth/sign-in']);
            }
          })
        );
    }
}