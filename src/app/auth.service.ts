import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from './user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  //
 // router: Router;
  // to handling the error
/*
  constructor(private userServivce: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute, ) {
    this.user$ = afAuth.authState;
   }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl );

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(user => {
      if (user) {
        this.userservice();
      }
    }
    // .then(user => {if (user) {
     // -------------------------------------------------------------------------------------------not working added in appmodule
    // this.router.navigateByUrl(returnUrl);
     //
    // }})
    );
  }


  logout() {
    this.afAuth.auth.signOut();
  }

}
*/

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
   }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl );

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(cred => {
      this.db.collection('users').doc(cred.user.uid).set({
        name: cred.user.displayName,
        email: cred.user.email,
        photoURL: cred.user.photoURL,
      });
    });
    this.db.collection('users').doc();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}

