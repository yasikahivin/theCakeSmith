import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
// error

export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService ) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .pipe(map(appUser => appUser.isAdmin));
    }

  /*
  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap((user) => {
        return this.userService.get(user.uid);
      }),
      map((appUser: any) => {
        return appUser.isAdmin;
      })
    );
  }
  */
  }



