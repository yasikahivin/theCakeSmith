import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUser } from 'src/app/models/app-user';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-sales-manager',
  templateUrl: './sales-manager.component.html',
  styleUrls: ['./sales-manager.component.scss']
})
export class SalesManagerComponent implements OnInit {
  users: AppUser[] = [];
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;


  orderRef: AngularFireList<any>;
  orders: Observable<any[]>;
  totalorders: number;
  totalconfirmedorders: number;

  totalCount: number;
  total = 0 ;

  // lineChartData: ChartDataSets[] = [
  //   { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  // ];

  // lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  // lineChartOptions = {
  //   responsive: true,
  // };

  // lineChartColors: Color[] = [
  //   {
  //     borderColor: 'black',
  //     backgroundColor: 'rgba(255,255,0,0.28)',
  //   },
  // ];

  // lineChartLegend = true;
  // lineChartPlugins = [];
  // lineChartType = 'line';

  constructor( db: AngularFireDatabase) {

    this.itemsRef = db.list('/users/');
    this.orderRef = db.list('/CustomizedOrders/');
    console.log(db.list('/users/', ref => ref.orderByChild('confirm').equalTo(true)));


    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.orders = this.orderRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )


    );

// get total users
    this.items.subscribe((dataArray => {
      this.totalCount = dataArray.length;
    }));

// get total orders

    this.orders.subscribe((dataArray => {
      this.totalorders = dataArray.length;
      console.log(dataArray);
    }));






}
  ngOnInit() {
  }
}
