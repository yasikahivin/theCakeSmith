import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent  {
  orders$;

  constructor(private orderService: OrderService) { 
    this.orders$ = orderService.getOrders();
  }

}
