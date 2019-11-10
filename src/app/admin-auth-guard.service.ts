import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// error on 18th

export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private authService: AuthService ) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(user => this.authService.get(user.uid).valueChanges()),
      map(appUser => appUser.isAdmin)
      );
  }
}
