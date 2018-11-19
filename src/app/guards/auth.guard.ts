import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AngularFireAuth
  ) { }

  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(map(auth => {
      if (!auth) {
        // if not logged in, redirect to login page
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }));
  }
}
