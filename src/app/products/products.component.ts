import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Product } from '../models/Product';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  // products$: any ;

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(route: ActivatedRoute,
              private productService: ProductService) {

      productService.getall().subscribe(products => {
        this.products = products;

        route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts =  this.category ?
          this.products.filter(p => p.category === this.category) : this.products;
      });

      });
    }

  ngOnInit() {}



}


