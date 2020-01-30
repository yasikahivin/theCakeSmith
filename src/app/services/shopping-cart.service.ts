import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/Product';
import { take } from 'rxjs/operators';

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

private getCart(cartId: string) {
  return this.db.object('/shopping-carts/' + cartId);
}

private getItem(cartId: string, productId: string){
  return this.db.object('/shopping-cart/' + cartId + '/Items' + productId);
}

private async getOrCreateCartId() {
  const cartId = localStorage.getItem('cartId');
  if (!cartId) {
            const result = await this.create();
            localStorage.setItem('cartId', result.key);
            // Add product to cart
            return result.key;
        }
  return cartId;
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);

    item$
      .valueChanges() // convert firebase object to observable
      .pipe(take(1)) // take 1 instance of an item
      .subscribe((item: any) => {
        // $exists() is deprecated. Just check if item is truthy.
         if (item) {
            item$.update({ quantity: item.quantity + 1 });
         } else {
          // since key and value are the same (eg, product: product) you can omit the value part.
            item$.set({product, quantity: 1 }); }
     });
  }


}



