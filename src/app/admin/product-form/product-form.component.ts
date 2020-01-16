import { Component, OnInit, NgModule } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

import {Category} from '../../models/Category';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})



export class ProductFormComponent implements OnInit  {
   // product: Product;
   id: string;
   product: Product = {  id: '', title: '', price: 0, category : '' , weight : 0 , imageURL: '' , description: '' };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ) {

        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) { this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p); }

        // this.product = new Product();
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

    delete() {
      if (!confirm('Do you want to delete this product?')) { return; }

      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }

    ngOnInit() {

    }


 }
