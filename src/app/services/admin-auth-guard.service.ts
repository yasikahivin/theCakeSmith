import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
// system admin authenticatin guard

export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService) { }


  // admin authenticaton checker
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



