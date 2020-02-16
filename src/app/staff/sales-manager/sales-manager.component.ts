import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUser } from 'src/app/models/app-user';

@Component({
  selector: 'app-sales-manager',
  templateUrl: './sales-manager.component.html',
  styleUrls: ['./sales-manager.component.scss']
})
export class SalesManagerComponent implements OnInit {
  users: AppUser[] = [];
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  orderRef: AngularFireList<any>;
  orders: Observable<any[]>;
  totalorders: number;

  totalCount: number;
  total = 0 ;

  constructor( db: AngularFireDatabase) {

    this.itemsRef = db.list('/users/');
    this.orderRef = db.list('/CustomizedOrders/');
    console.log(db.list('/users/', ref => ref.orderByChild("confirm").equalTo(true)))


    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.orders = this.orderRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )

    );

    // console.log(this.orders);

// get total users
    this.items.subscribe((dataArray => {
      this.totalCount = dataArray.length;

      // this.users = dataArray.map(item => {
      //   //this.total ++ ;
      //   console.log(this.totalCount.);
      //   return {id : item.payload.doc.id,
      //   ...item.payload.doc.data()
      //   } as AppUser;
      // });
    }));

// get total orders

    this.orders.subscribe((dataArray => {
      this.totalorders = dataArray.length;
      console.log(dataArray);
    }));



}
  ngOnInit() {
  }

}
