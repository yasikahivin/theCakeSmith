import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

import {Category} from '../../models/Category';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent {
  list: Category [];



  constructor(  private productService: ProductService) {
   }

   save(product: any) {
     this.productService.create(product);
     console.log(product);
   }


 }
