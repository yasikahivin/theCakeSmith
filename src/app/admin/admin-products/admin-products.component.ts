import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products$: any ;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getall();
   }

  ngOnInit() {
  }

}
