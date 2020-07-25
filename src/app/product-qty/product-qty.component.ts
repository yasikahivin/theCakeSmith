import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/Product';

@Component({
  selector: 'product-qty',
  templateUrl: './product-qty.component.html',
  styleUrls: ['./product-qty.component.scss']
})
export class ProductQtyComponent {
  @Input('product') product: Product;
  //@Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;
  closeResult: string;
  // showAction = true;

  constructor(private cartService: ShoppingCartService) { }

     

      addToCart() {
        this.cartService.addToCart(this.product);
      }

      removeFromCart() {// set to () :removeFromCart(this.product);
        this.cartService.removeFromCart(this.product);
      }

      
  

}
