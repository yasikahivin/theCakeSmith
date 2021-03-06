import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;
  user$: Observable<firebase.User>;
  Log: any;
  userSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    public router: Router,
    public ngZone: NgZone,
    private db: AngularFireDatabase
  ) { this.user$ = afAuth.authState; }


  async SendVerificationMail() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['./login']);
  }

  // LOGIN WITH GOOGLE AUTH PROVIDER
  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  }

  // NORMAL LOGIN
  login2(email: string, password: string) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  register(email: string, password: string, fName: string, role: string, isUser: boolean) {
    console.log(fName);
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified !== true) {
          this.SendVerificationMail();
          window.alert('You are registered and now logged in');
        } else {
          this.ngZone.run(() => {
            this.router.navigate(['newUser']);
          });
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });

  }

  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    window.alert('Please validate your email address. Kindly check your inbox.');
  }




  logout() {
    this.router.navigate(['/']);
    this.afAuth.auth.signOut();
  }

  // pipe takes in data as input and transforms it to a desired output
  // switchMap on each emission the previous inner observable (the result of the function) is cancelled and the new observable is subscribed
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


}

