import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

// didn't used yet


@Injectable({
  providedIn: 'root'
})
export class UserService {


    constructor(private afAuth: AngularFireAuth,
                private db: AngularFirestore) { }

    Save(user: firebase.User) {
      this.db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
      this.db.collection('users').doc();
}
}
