import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnInit {
  categories;

  constructor(private categoryService: CategoryService) { }

   ngOnInit() {
     this.categoryService.getCategories().subscribe(categories => this.categories = categories);
   }
 }
