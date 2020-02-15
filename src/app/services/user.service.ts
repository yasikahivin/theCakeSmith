import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs/internal/Observable';

// didn't used yet


@Injectable({
  providedIn: 'root'
})
export class UserService {
user$: Observable<firebase.User>;

    constructor(private db: AngularFireDatabase) {
                  // this.user$ = afAuth.authState;
                }

    Save(user: firebase.User) {
      this.db.object('/users/' + user.uid).update
      ({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
    }

    get(uid: string): Observable<AppUser> {
        return this.db.object<AppUser>('/users/' + uid).valueChanges();
        // console.log('/users/');
    }


}
