import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { HostListener } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
// import { HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService) {

  }

  async ngOnInit() {
    // throw new Error("Method not implemented.");
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    const cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe((cart => {
      this.shoppingCartItemCount = 0;
      for (const productId of Object.keys(cart.items)) {
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    }));
  }


  logout() {
    this.auth.logout();
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e) {
    const element = document.querySelector('.navbar');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');
    } else {
      element.classList.remove('navbar-inverse');
    }
  }


}
