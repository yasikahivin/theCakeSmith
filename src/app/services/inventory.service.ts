import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Inventory } from '../models/Inventory'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  inventoryCollection: AngularFirestoreCollection<Inventory>;
  inventoryDoc: AngularFirestoreDocument<Inventory>;
  inventories: Observable<Inventory[]>;
  inventory: Observable<Inventory>;

  invItemsRef: AngularFireList<any>;
  invItems: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.invItemsRef = db.list('/inventory/');

    this.invItems = this.invItemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

create(inventory: any) {
  this.invItemsRef.push(inventory);
}

getall() {
  return this.invItems;
}

get(inventoryId: string) {
  return this.db.object('/inventory/' + inventoryId).valueChanges();
}

update(inventoryId: string , inventory: Partial<unknown>) {
  return this.db.object('/inventory/' + inventoryId).update(inventory);
}

delete(inventoryId: string) {
  return this.db.object('/inventory/' + inventoryId).remove();
}
}
