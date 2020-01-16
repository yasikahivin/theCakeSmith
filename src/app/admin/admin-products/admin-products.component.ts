import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] ;
  subscription: Subscription;
  filteredproducts: any[];

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getall()
      .subscribe(products => this.filteredproducts = this.products = products);
   }

  filter(query: string) {
    this.filteredproducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query)) :
    this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
