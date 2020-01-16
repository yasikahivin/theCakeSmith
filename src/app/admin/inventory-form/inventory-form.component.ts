import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { InventoryService } from 'src/app/services/inventory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { Inventory } from 'src/app/models/Inventory';


@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit {
  id: string;
  inventory: Inventory = { id:'', name:'', unit_price: 0, quantity:0, unit_weight: 0 };

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { 

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) { this.inventoryService.get(this.id).pipe(take(1)).subscribe(i => this.inventory = i); }


   }

   save(inventory: any) {
    if (this.id) {
        this.inventoryService.update(this.id, inventory);
    } else {
        this.inventoryService.create(inventory);
    }
    console.log(inventory);
    this.router.navigate(['/admin/inventory']);
}

delete() {
  if (!confirm('Do you want to delete this item from inventory?')) { return; }

  this.inventoryService.delete(this.id);
  this.router.navigate(['/admin/inventory']);
}

  ngOnInit() {
  }

}
