import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from '../models/Product';
import { take, map, switchMap } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

// create shopping cart
private create() {
  return this.db.list('/shopping-carts').push({
    dateCreated: new Date().getTime()
  });

  }
 

//remove items in cart
async clearCart() {
  const cartId = await this.getOrCreateCartId();
  this.db.object('/shopping-carts/' + cartId + '/items').remove();
}

// get the cartId from shopping cart
async getCart(): Promise<Observable<ShoppingCart>> {
  let cartId = await this.getOrCreateCartId();
  return this.db
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(map((x)=> (x) ? new ShoppingCart(( x as any).items): (x as any)
));
}

  // private getItem(cartId: string, productId: string) {
  //   return this.db.object('/shopping-cart/' + cartId + '/Items/' + productId);
  // }

// craete cart id for each shopping cart
private async getOrCreateCartId(): Promise<string> {
  const cartId = localStorage.getItem('cartId');
  if (cartId) {return cartId; }
  const result = await this.create();
  localStorage.setItem('cartId', result.key);
                // Add product to cart
  return result.key;

  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
}  
//// increase quantity when items add to cart
async addToCart(product: Product) {
  this.updateItem(product, 1);
}

async removeFromCart(product: Product) {
  this.updateItem(product, -1);
}
  
  //remove items from shopping cart
  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item) => {
        if (item.payload.exists()) {
            let quantity = item.payload.exportVal().quantity + change;
            if (quantity === 0) item$.remove();
            else
                item$.update({
                  
                    quantity: quantity
                });
        } else {
            item$.set({ 
              title: product.title,
              imageUrl: product.imageURL,
              price: product.price, quantity: 1 });
        }
    });
}

 


}



