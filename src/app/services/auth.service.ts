import { Injectable, NgZone} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    public router: Router,
    public ngZone: NgZone) {
    this.user$ = afAuth.authState;
   }


   SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['<!-- enter your route name here -->']);
    });
  }


  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl );

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    /*.then(cred => {
      this.db.collection('users').doc(cred.user.uid).set({
        name: cred.user.displayName,
        email: cred.user.email,
        photoURL: cred.user.photoURL,
      });
    });*/

    // this.db.collection('users').doc(user.uid);
  }



  login2(email: string, password: string) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl );

    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
      err => reject(err));
    });
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)

        .then((result) => {
          if (result.user.emailVerified !== true) {
            this.SendVerificationMail();
            window.alert('Please validate your email address. Kindly check your inbox.');
          } else {
            this.ngZone.run(() => {
              this.router.navigate(['<!-- enter your route name here -->']);
            });
          }
      });
    });
  }



  logout() {
    this.afAuth.auth.signOut();
  }

get appUser$(): Observable<AppUser> {
  return this.user$.pipe(
    switchMap(user => {
      if (user) {
        return this.userService.get(user.uid);
      } else {
        return of(null);
      }
    })
  );
}

/*
  get(uid: string): AngularFirestoreCollection<AppUser> {
    return this.db.collection('users' + uid);
  }
  */

}

