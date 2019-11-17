import { Injectable, CollectionChangeRecord } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from './user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/firestore';
import { AppUser } from './models/app-user';
import { switchMap } from 'rxjs/operators';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

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

  login2(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
      err => reject(err));
    });
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
      err => reject(err));
    });
  }
 
  logout() {
    this.afAuth.auth.signOut();
  }
/*
  get(uid: string): AngularFirestoreCollection<AppUser> {
    return this.db.collection('users' + uid);
  }
  */

}

