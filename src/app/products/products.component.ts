import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import 'rxjs';

import { Product } from '../models/Product';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[];


  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => this.products );
  }

}
