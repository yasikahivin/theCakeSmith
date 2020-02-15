import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Custom } from '../models/Custom';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CustomService {
  custOrderCollection: AngularFirestoreCollection<Custom>;
  custOrderDoc: AngularFirestoreDocument<Custom>;
  custOrders: Observable<Custom[]>;
  custOrder: Observable<Custom>;

  orderRef: AngularFireList<any>;
  orders: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.orderRef = db.list('/CustomizedOrders');

    this.orders = this.orderRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
    );
  }

create(custOrder: any) {
  this.orderRef.push(custOrder);
}

getall() {
  return this.orders;
}

get( custOrderID: string ) {
  return this.db.object('/CustomizedOrders/' + custOrderID).valueChanges();
}

update( custOrderID: string, custOrder: Partial<unknown>) {
  return this.db.object('/CustomizedOrders/' + custOrderID).update(custOrder);
}

delete( custOrderID: string ) {
  return this.db.object('/CustomizedOrders/' + custOrderID).remove();
}

insert( custOrders ) {
  this.orderRef.push(custOrders);
}

getorders() {
  this.orderRef = this.db.list('CustomizedOrders');
}

}
