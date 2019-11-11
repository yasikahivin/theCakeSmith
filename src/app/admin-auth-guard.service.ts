import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { switchMap, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// error

/*export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private authService: AuthService ) { }

 canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
     // switchMap(user => this.authService.get(user.uid).valueChanges()),
      map((appUser: any) => appUser.isAdmin)
      );
  }

}
