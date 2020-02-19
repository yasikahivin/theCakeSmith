import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ShoppingCart } from "../models/shopping-cart";
import { map } from 'rxjs/operators';
import { AppUser } from '../models/app-user';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart: ShoppingCart;
  appUser: AppUser;

  constructor(private shoppingCartService: ShoppingCartService,
    auth: AuthService) { }

  async ngOnInit() {

    const cart$ = await this.shoppingCartService.getCart();
    // await (await this.shoppingCartService.getCart()).valueChanges().pipe(map(res=>res as ShoppingCart)).subscribe(res=>{
    //   console.log(res);this.cart=res});
    // console.log ()


    //  this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    // tslint:disable-next-line: align
    // console.log  (
    //     cart$.valueChanges().subscribe(cart => {
    //         for (const productId of Object.keys (cart.items)) {
    //           this.cart.items[productId].;
    //         }
    //       }))

    // cart$.valueChanges().subscribe((cart => {
    //   for (const productId of Object.keys (cart.items)) {
    //     this.shoppingCartItemCount += cart.items[productId].quantity;
    //   }
    // }));
  }

  clearCart() {
    // this.shoppingCartService.clearCart();
  }
}
