import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './models/Product';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productCollection:  AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>;
  products: Observable<Product[]>;
  product: Observable<Product>;

  constructor(private afs: AngularFirestore) {
    this.productCollection = this.afs.collection('products',
    ref => ref.orderBy('name','asc'));
  }

  getProducts(): Observable<Product[]>{
    this.products = this.productCollection.snapshotChanges().pipe(
        map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Product;
          data.id = action.payload.doc.id;
          return data;
        });
      })); 
    
      return this.products;
  }

}

