import { Component, OnInit, OnDestroy } from '@angular/core';
import { Custom } from 'src/app/models/CustomOrders';
import { Subscription } from 'rxjs';
import { CustomService } from 'src/app/services/custom.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit, OnDestroy {

  customizedOrders: Custom[] ;
  customizedConfirmOrders: Custom[] ;
  Confirmfilteredorder: any[] = [];
  subscription: Subscription;
  filteredorder: any[] = [];
  isSubmitted: boolean;



  constructor(private customService: CustomService, private db: AngularFireDatabase) {

  }

  filter(query: string) {
     this.filteredorder = (query) ?
     this.customizedOrders.filter(c => c.reqDate.toLowerCase().includes(query)) :
     this.customizedOrders;
     console.log(this.filteredorder);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  Update(id) {
    this.db.object('/CustomizedOrders/' + id).update({confirm: true});

  }

  ngOnInit() {

    this.subscription = this.customService.getall()
    .subscribe(data => {
     console.log("xxxxxxxxxx",data);
      this.customizedOrders = data;
      this.filteredorder = [];
      this.customizedOrders.forEach(element => {
        if (!element.confirm) {
          this.filteredorder.push(element);
        }
        console.log(element.confirm);
      });
      // this.filteredorder = this.customizedOrders = customizedOrders;
      // console.log(this.filteredorder)
      }
    );

    this.subscription = this.customService.getall()
    .subscribe(data => {
     // console.log(data);
      this.customizedConfirmOrders = data;
      this.Confirmfilteredorder = [];
      this.customizedConfirmOrders.forEach(element => {
        if (element.confirm) {
          this.Confirmfilteredorder.push(element);
        }
        console.log(element.confirm);
      });
      // this.filteredorder = this.customizedOrders = customizedOrders;
      // console.log(this.filteredorder)
      }
    );


  }




}
