import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent  {
  @Input('product') product: Product;
  closeResult: string;

  constructor(private modalService: NgbModal,
              private shoppingCartService: ShoppingCartService) { }

      open(content: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason: any) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      addToCart(product: Product) {
        const cartId = localStorage.getItem('cartId');
        if (!cartId) {
            this.shoppingCartService.create()
            .then(result => {localStorage.setItem('cartId', result.key);
          });
        }

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
