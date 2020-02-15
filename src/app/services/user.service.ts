import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

// didn't used yet


@Injectable({
  providedIn: 'root'
})
export class UserService {
    user$: Observable<firebase.User>;
    itemsRef: AngularFireList<any>;
    items: Observable<any[]>;

    constructor(private db: AngularFireDatabase) {
      this.itemsRef = db.list('/products/');

      this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
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
    }

    getall() {
      return this.items;
    }


}
