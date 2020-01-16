import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';


import { Product } from '../models/Product';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any = [];
  previous: any = [];
  headElements = ['ID', 'Item'];

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(route: ActivatedRoute,
              private productService: ProductService,
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

    ngOnInit() {


      this.mdbTable.setDataSource(this.filteredProducts);
      this.filteredProducts = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.filteredProducts.length===this.mdbTablePagination.lastItemIndex;
    }

    ngAfterViewInit() {
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
      this.cdRef.detectChanges();
    }



}


