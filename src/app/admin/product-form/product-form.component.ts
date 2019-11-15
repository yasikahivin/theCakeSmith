import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

import {Category} from '../../models/Category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnInit {
  list: Category [];

  constructor(private categoryService: CategoryService) {

   }

   ngOnInit() {
    this.categoryService.getCategories().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ... item.payload.doc.data()
        } as Category;
      })
    });
   }
 }
