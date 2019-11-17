import { Component, OnInit, NgModule } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

import {Category} from '../../models/Category';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})



export class ProductFormComponent implements OnInit  {
   product = {};


  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { this.productService.get(id).valueChanges().subscribe(p => this.product = p);
     }
    }

   save(product: any) {
     this.productService.create(product);
     console.log(product);
     this.router.navigate(['/admin/products']);
   }

   ngOnInit() {
   }


 }
