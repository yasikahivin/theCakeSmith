import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Custom } from '../models/CustomOrders';
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
  data = [];
  constructor(private db: AngularFireDatabase) {
    this.orderRef = db.list('/CustomizedOrders');

    this.orders = this.orderRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    // this.orderRef.snapshotChanges().subscribe(data => {
    //   // this.temp=data;
    //   console.log(data)
    //   data.forEach(element=>{
    //     let temp: Custom;
    //     temp = element.payload.val();
    //     temp.id = element.payload.key;
    //     this.data.push(temp);

    //     // console.log(temp)
    //   });
    // });

  }

  // create customised order
  create(custOrder: any) {
    this.orderRef.push(custOrder);
  }

  // get all cutomised orders
  getall() {
    return this.orders;
  }

  // get customized order
  get(custOrderID: string) {
    return this.db.object('/CustomizedOrders/' + custOrderID).valueChanges();
  }

  // update customized order
  update(custOrderID: string, custOrder: Partial<unknown>) {
    return this.db.object('/CustomizedOrders/' + custOrderID).update(custOrder);
  }

  // delete customized order
  delete(custOrderID: string) {
    return this.db.object('/CustomizedOrders/' + custOrderID).remove();
  }

  insert(custOrders) {
    this.orderRef.push(custOrders);
  }

  getorders() {
    this.orderRef = this.db.list('CustomizedOrders');
  }



}
