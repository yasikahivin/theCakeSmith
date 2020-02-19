import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {

  public items: ShoppingCartItem[] ;

    costructor( items: ShoppingCartItem[]){}


    get productIds() {
      return Object.keys(this.items);
    }
  // constructor(data?: Partial<ShoppingCart>) {
  //   Object.assign(this, data);
  // }

    // get totalItemsCount() {

    //   let count = 0;
    //   for (const productId of Object.keys (this.items)) {
    //     count += this.items[productId].quantity;
    //   }
    //   return count;
    // }


}
