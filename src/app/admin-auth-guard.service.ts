import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { switchMap, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
// error

export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService ) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(({uid}) => {
        return this.userService.get(uid);
      }),
      map(user => {
        return user.isAdmin;
      })
    );
  }
  }



