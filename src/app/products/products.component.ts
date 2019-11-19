import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

import { Product } from '../models/Product';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(route: ActivatedRoute,
              private productService: ProductService) {
                productService.getall().subscribe(products => {
                  this.products = products;
                  console.log(this.products);

                  route.queryParamMap.subscribe(params => {
                  this.category = params.get('category');
                  console.log(this.category);

                  this.filteredProducts =  this.category ?
                    this.products.filter(p => p.category === this.category) : this.products;
                  console.log(this.filteredProducts);
                });

                });
              }

  ngOnInit() {}

}
