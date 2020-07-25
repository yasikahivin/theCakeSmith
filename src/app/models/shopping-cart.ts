import { ShoppingCartItem } from './shopping-cart-item';
import { Key } from 'protractor';
import { Product } from './Product';

export class ShoppingCart {
 items: ShoppingCartItem[]=[]; 
 constructor(public itemsMap: { [productId: string]: ShoppingCartItem}){
  for( const productId of Object.keys(itemsMap)){
    const item = itemsMap[productId];
    this.items.push(new ShoppingCartItem(item.product, item.quantity));

  }

 }

 getQuantity(product: Product) {
  
  const item = this.itemsMap[product.key];
  return item ? item.quantity : 0;
}

 get totalPrice(){
  let total = 0;
  for ( const productId of Object.keys(this.items))
  total += this.items[productId].totalPrice;
  return total;
}

   
    get totalItemsCount(){

      let count = 0;
      for (const productId of Object.keys (this.itemsMap)) {
        count += this.itemsMap[productId].quantity;
      }
      return count;
    }
}
