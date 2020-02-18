import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs/internal/Observable';

import { AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class UserService {
user$: Observable<firebase.User>;
useri: Observable<AppUser>;
usersRef: AngularFireList<any>;
users: Observable<any[]>;

    constructor(private db: AngularFireDatabase) {
      this.usersRef = db.list('/users');

      this.users = this.usersRef.snapshotChanges().pipe(
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
        photoURL: user.photoURL,
      });
      // this.db.object('/users/' + user.uid).update
      // ({
      //   isUser: true,
      //   role: 'User',
      //   isStockM: false,
      //   isSalesM: false,
      //   isAdmin: false,
      // });
      // this.db.object('/users/' + user.uid).update
      // ({
      //   isStockM: true,
      //   role: 'StockM',
      //   isSalesM: false,
      //   isAdmin: false,
      //   isUser: false,
      // });
      // this.db.object('/users/' + user.uid).update
      // ({
      //   isSalesM: true,
      //   role: 'SalesM',
      //   isStockM: false,
      //   isAdmin: false,
      //   isUser: false,
      // });
      // this.db.object('/users/' + user.uid).update
      // ({
      //   isAdmin: true,
      //   role: 'Admin',
      //   isStockM: false,
      //   isSalesM: false,
      //   isUser: false,
      // });
    }

    get(uid: string): Observable<AppUser> {
        return this.db.object<AppUser>('/users/' + uid).valueChanges();
    }

    getall() {
      return this.users;
    }

    update(uid: string , useri: Partial<unknown>) {
      return this.db.object('/users/' + uid).update(useri);
    }

    delete(uid: string) {
      return this.db.object('/users/' + uid).remove();
    }

    create(useri: any) {
      this.usersRef.push(useri);
    }

}
