import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';
// import { OrderService } from '../../services/order.service';
// import { Order } from "../../models/order";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-checkout-data-form',
  templateUrl: './checkout-data-form.component.html',
  styleUrls: ['./checkout-data-form.component.scss']
})
export class CheckoutDataFormComponent implements OnInit, OnDestroy {
  id; string;

  constructor() { }

  ngOnInit() {
    //
  }

  ngOnDestroy() {
    // this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    // this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    // let order = new Order(this.userId, this.shipping, this.cart);
    // let result = await this.orderService.placeOrder(order);
    // this.router.navigate(['/order-success', result.key]);
  }
}
