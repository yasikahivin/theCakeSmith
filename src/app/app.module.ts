import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { NgFlashMessagesModule } from 'ng-flash-messages';
// import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ChartsModule } from 'ng2-charts';

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
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { SignupComponent } from './signup/signup.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { CustomService } from './services/custom.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { InventoryService } from './services/inventory.service';

import { ProductService } from './services/product.service';
import { MenuComponent } from './menu/menu.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './products/product-card/product-card.component';

import { InventoryFormComponent } from './admin/inventory-form/inventory-form.component';
import { AdminInventoryComponent } from './admin/admin-inventory/admin-inventory.component';
import { CustomComponent } from './custom/custom.component';
import { ContactComponent } from './contact/contact.component';
import { SystemAdminComponent } from './staff/system-admin/system-admin.component';
// import { SalesManagerComponent } from './staff/sales-manager/sales-manager.component';

import { NewUserComponent } from './signup/new-user/new-user.component';
import { SalesManagerComponent } from './staff/sales-manager/sales-manager.component';
import { SalesmanagerAuthGuardService } from './services/salesmanager-auth-guard.service';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { ContactService } from './services/contact.service';
import { StockManagerComponent } from './staff/stock-manager/stock-manager.component';
import { CustomDescriptionComponent } from './custom/custom-description/custom-description.component';
import { TermsConditionsComponent } from './Policies/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './Policies/privacy-policy/privacy-policy.component';
import { FullCalendarModule } from '@fullcalendar/angular';



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
    ProductCardComponent,
    InventoryFormComponent,
    AdminInventoryComponent,
    CustomComponent,
    ContactComponent,
    SystemAdminComponent,
    // SalesManagerComponent,
    NewUserComponent,
    SalesManagerComponent,
    ManageOrdersComponent,
    StockManagerComponent,
    CustomDescriptionComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    MDBBootstrapModule.forRoot(),
    NgFlashMessagesModule.forRoot(),
    FormsModule,
    NgbModule,
    CustomFormsModule,
    FullCalendarModule
    // HttpModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    SalesmanagerAuthGuardService,
    CategoryService,
    ProductService,
    UserService,
    ShoppingCartService,
    InventoryService,
    CustomService,
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
