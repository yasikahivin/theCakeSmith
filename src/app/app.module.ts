import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { NgFlashMessagesModule } from 'ng-flash-messages';
// import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { SignupComponent } from './signup/signup.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';

import { ProductService } from './product.service';
import { MenuComponent } from './menu/menu.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    MyOrdersComponent,
    SignupComponent,
    ProductFormComponent,
    MenuComponent,
    FooterComponent,
    AboutUsComponent,
    ProductFilterComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MDBBootstrapModule.forRoot(),
    NgFlashMessagesModule.forRoot(),
    FormsModule,
    NgbModule,
    CustomFormsModule
    // HttpModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    UserService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
