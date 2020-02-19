import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { Subscription } from 'rxjs';
import { Inventory } from '../../models/Inventory';

@Component({
  selector: 'app-admin-inventory',
  templateUrl: './admin-inventory.component.html',
  styleUrls: ['./admin-inventory.component.scss']
})
export class AdminInventoryComponent implements OnInit {
  inventories: Inventory[] ;
  subscription: Subscription;
  filteredinventories: any[];

  constructor(private inventoryService: InventoryService) {
    this.subscription = this.inventoryService.getall()
      .subscribe(inventories => this.filteredinventories = this.inventories = inventories);
   }

  filter(query: string) {
    this.filteredinventories = (query) ?
    this.inventories.filter(i => i.name.toLowerCase().includes(query)) :
    this.inventories;
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  ngOnInit() {
  }
}
