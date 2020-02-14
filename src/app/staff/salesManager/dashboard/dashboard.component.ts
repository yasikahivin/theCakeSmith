import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../../services/custom.service';
import { Subscription } from 'rxjs';
import { Custom } from '../../../models/Custom';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
