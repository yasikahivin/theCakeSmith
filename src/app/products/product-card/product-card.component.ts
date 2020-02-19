import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ShoppingCartComponent } from 'src/app/shopping-cart/shopping-cart.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent  {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') ShoppingCart;
  closeResult: string;
  // showAction = true;

  products: Product[] = [];
  prodRef: AngularFireList<any>;
  prod: Observable<any[]>;

  order: Product={key: '',
                  id: '',
                  title: '',
                  price: 0,
                  category: '',
                  weight: 0,
                  imageURL: '',
                  description: '',

                  };

  constructor(private modalService: NgbModal,
              private cartService: ShoppingCartService,
              private db: AngularFireDatabase) { }

      open(content: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason: any) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      addToCart() {
        this.cartService.addToCart(this.product);
        this. db.list('/cartnew').push.

      }

      removeFromCart() {// set to () :removeFromCart(this.product);
        this.cartService.removeFromCart(this.product);
      }

      getQuantity() {
        if (!this.ShoppingCart) { return 0; }
        const item = this.ShoppingCart.items[this.product.key];
        return item ? item.quantity : 0;
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
