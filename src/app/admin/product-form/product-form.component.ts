import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

import {Category} from '../../models/Category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnInit {
  categories$;
  
  constructor(private categoryService: CategoryService) {
    this.categories$= this.categoryService.getCategories;
   
   }
 
   ngOnInit() {

   }
 
 }
 

 