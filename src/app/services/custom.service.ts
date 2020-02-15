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
  cust_orderCollection: AngularFirestoreCollection<Custom>;
  cust_orderDoc: AngularFirestoreDocument<Custom>;
  cust_orders: Observable<Custom[]>;
  cust_order: Observable<Custom>;

  orderRef: AngularFireList<any>;
  orders: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { 
    this.orderRef = db.list('/orders');

    this.orders = this.orderRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
    );
  }

create(cust_order: any) {
  this.orderRef.push(cust_order);
}

getall() {
  return this.orders;
}

get( cust_orderID:string ){
  return this.db.object('/orders/'+ cust_orderID).valueChanges();
}

update( cust_orderID: string, cust_order: Partial<unknown>){
  return this.db.object('/orders/'+ cust_orderID).update(cust_order);
}

delete( cust_orderID: string ){
  return this.db.object('/orders/'+ cust_orderID).remove();
}

insert( cust_orders ) {
  this.orderRef.push(cust_orders);
}

getorders(){
  this.orderRef = this.db.list('orders');
}

}
