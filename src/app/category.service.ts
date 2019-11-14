import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from './models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryCollection:  AngularFirestoreCollection<Category>;
  categoryDoc: AngularFirestoreDocument<Category>;
  categories: Observable<Category[]>;
  category: Observable<Category>;

  constructor(private db:AngularFirestore) { }

  getCategories() {
    this.categories = this.categoryCollection.snapshotChanges().pipe(
      map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Category;
        return data;
      });
    })); 
  
    return this.categories;}
}
