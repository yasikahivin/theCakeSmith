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
   id: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ) {

        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) { this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p); }
    }

   save(product: any) {
        if (this.id) {
            this.productService.update(this.id, product);
        } else {
          this.productService.create(product);
          }
        console.log(product);
        this.router.navigate(['/admin/products']);
   }

   ngOnInit() {
   }


 }
