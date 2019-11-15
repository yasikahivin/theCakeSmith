import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

import { Product } from '../models/Product';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  noProducts: any; // to fix the error in html file


  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

}
