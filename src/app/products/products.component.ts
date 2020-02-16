import { Component, OnInit, OnDestroy} from '@angular/core';
import { ProductService } from '../services/product.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';


import { Product } from '../models/Product';
import { from, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(route: ActivatedRoute,
      private productService: ProductService,
      private shoppingCartService: ShoppingCartService,
      private cdRef: ChangeDetectorRef) {
      productService.getall().subscribe(products => {
        this.products = products;

        // console.log(this.filteredProducts.lastIndexOf);
        route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts =  this.category ?
          this.products.filter(p => p.category === this.category) : this.products;
        console.log(this.filteredProducts.length);
          });

      });
    }

   async ngOnInit() {
      this.subscription = (await this.shoppingCartService.getCart()).valueChanges().subscribe(cart => this.cart = cart);
     }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }}


