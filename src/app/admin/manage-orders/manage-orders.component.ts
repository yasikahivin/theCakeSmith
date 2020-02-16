import { Component, OnInit } from '@angular/core';
import { Custom } from 'src/app/models/CustomOrders';
import { Subscription } from 'rxjs';
import { CustomService } from 'src/app/services/custom.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {

  customizedOrders: Custom[] ;
  subscription: Subscription;
  filteredproducts: any[];
  isSubmitted: boolean;



  constructor(private customService: CustomService,
              private db: AngularFireDatabase) {
    this.subscription = this.customService.getall()
      .subscribe(customizedOrders => this.filteredproducts = this.customizedOrders = customizedOrders);

  }

  filter(query: string) {
     this.filteredproducts = (query) ?
     this.customizedOrders.filter(c => c.reqDate.toLowerCase().includes(query)) :
     this.customizedOrders;
  }



  ngOnInit() {
  }




}
