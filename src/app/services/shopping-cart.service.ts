import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import { Product } from '../models/Product';
import { take, map, switchMap } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

private create() {
  return this.db.list('/shopping-carts').push({
    dataCreated: new Date().getTime()
  });

}

async clearCart() {
  const cartId = await this.getOrCreateCartId();
  this.db.object('/shopping-carts/' + cartId + '/items').remove();
}


 async getCart(): Promise<AngularFireObject<ShoppingCart>> {
  const cartId = await this.getOrCreateCartId();
  return this.db.object('/shopping-carts/' + cartId)
}


// async getCart(): Observable<ShoppingCart> {
//   return this.getOrCreateCartId()
//     .pipe(
//       switchMap((cartId: string) => {
//         const cart = this.db.doc<ShoppingCart>('shopping-carts/' + cartId);
//         return cart.valueChanges();
//       })
//     )
// }

// private getItem(cartId: string, productId: string) {
//   return this.db.object('/shopping-cart/' + cartId + '/Items/' + productId);
// }

private async getOrCreateCartId(): Promise<string> {
  const cartId = localStorage.getItem('cartId');
  if (cartId) {return cartId; }
  const result = await this.create();
  localStorage.setItem('cartId', result.key);
                // Add product to cart
  return result.key;

  }
//// suprime solution (yasika)
  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item) => {
      if (item.payload.exists()) {
        item$.update({ quantity: (item.payload.exportVal().quantity || 0) + 1 });
      } else {
        item$.set({ product: product, quantity: 1 });
      }
    });
  }

  async removeFromCart(product: Product){
    const cartId = await this.getOrCreateCartId();
    const item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe((item) => {
      if (item.payload.exists()) {
        item$.update({ quantity: (item.payload.exportVal().quantity || 0)  - 1 });
      } else {
        item$.set({ product: product, quantity: 1 });
      }
    });
  }

  // private async updateItemQuantity(product: Product, change: number){
  //   const cartId = await this.getOrCreateCartId();
  //   const item$ = this.getItem(cartId, product.key);

  //   item$
  //     .valueChanges() // convert firebase object to observable
  //     .pipe(take(1)) // take 1 instance of an item
  //     .subscribe((item: any) => {
  //       // $exists() is deprecated. Just check if item is truthy.
  //        if (item) {
  //           item$.update({ quantity: item.quantity + change });
  //        } else {
  //         // since key and value are the same (eg, product: product) you can omit the value part.
  //           item$.set({product, quantity: 1 }); }
  //    });
  // }


}



