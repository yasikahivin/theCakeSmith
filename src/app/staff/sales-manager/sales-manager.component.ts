import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AppUser } from 'src/app/models/app-user';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { CustomService } from 'src/app/services/custom.service';

@Component({
  selector: 'app-sales-manager',
  templateUrl: './sales-manager.component.html',
  styleUrls: ['./sales-manager.component.scss']
})

export class SalesManagerComponent implements OnInit {
  users: AppUser[] = [];
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  calendarEvents: any[] = [];
 /////////////////////// calendarPlugins = [dayGridPlugin];
  // public venue_name: any;
  count: any = 1;
  i: any;


  orderRef: AngularFireList<any>;
  orders: Observable<any[]>;
  totalorders: number;
  totalconfirmedorders: number;

  totalCount: number;
  total = 0 ;

  // lineChartData: ChartDataSets[] = [
  //   { data: [32, 18, 0, 0, 0, 0] , label: 'Orders' },
  // ];

  // lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  // lineChartOptions = {
  //   responsive: true,
  // };

  // lineChartColors: Color[] = [
  //   {
  //     borderColor: 'black',
  //     backgroundColor: 'rgba(155,150,200,1)',
  //   },
  // ];

  // lineChartLegend = true;
  // lineChartPlugins = [];
  // lineChartType = 'line';

  constructor( db: AngularFireDatabase,
               private customService: CustomService,) {

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

    this.getData().subscribe(data => this.calendarEvents = data);

    // .subscribe(data => {
    //  console.log("xxxxxxxxxx",data);
    //   this.customizedOrders = data;
    //   this.filteredorder = [];
    //   this.customizedOrders.forEach(element => {
    //     if (!element.confirm) {
    //       this.filteredorder.push(element);
    //     }
    //     console.log(element.confirm);
    //   });
    //   // this.filteredorder = this.customizedOrders = customizedOrders;
    //   // console.log(this.filteredorder)
    //   }
    // );

  }

  getData(): Observable<any[]> {

    return this.customService.getall().pipe(
      tap(events => console.log('filtered - ', events)),
      // this is added to observe the data which are retrieving from the database and passed to the 'events' array
      map(events => events.map(event => {
        // the data retrived from the database are retrieved as timestamp. So here it's getting map to a date format
        const data: any = event;
        data.start = data.reqDate.toDate();
       // data.end = data.reqDate.toDate();
        data.end++;
        // data.end++;
        return data;
        // let obj={title:data.event_name,start:new Date(data.date)}
        // return obj;

      }))
    );
  }
}
