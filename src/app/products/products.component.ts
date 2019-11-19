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
  products$: any ;
  closeResult: string;

  constructor(route: ActivatedRoute,
    private modalService: NgbModal,
    private productService: ProductService) {
      this.products$ = this.productService.getall();
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
              
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  ngOnInit() {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}


