import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './models/Product';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productCollection: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>;
  products: Observable<Product[]>;
  product: Observable<Product>;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor( private db: AngularFireDatabase) {
    this.itemsRef = db.list('/products/');

    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

create(product: any) {
  this.itemsRef.push(product);
}

getall() {
  return this.items;
}

get(productId: string) {
  return this.db.object('/products/' + productId).valueChanges();
}

update(productId: string , product: Partial<unknown>) {
  return this.db.object('/products/' + productId).update(product);
}

delete(productId: string){
  return this.db.object('/products/' + productId).remove();
}

}

