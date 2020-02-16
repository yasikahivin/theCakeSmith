import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminInventoryComponent } from './admin/admin-inventory/admin-inventory.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SignupComponent } from './signup/signup.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { InventoryFormComponent } from './admin/inventory-form/inventory-form.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CustomComponent } from './custom/custom.component';
import { ContactComponent} from './contact/contact.component';
import { NewUserComponent } from './signup/new-user/new-user.component';
import { SalesManagerComponent } from './staff/sales-manager/sales-manager.component';
import { SalesmanagerAuthGuardService } from './services/salesmanager-auth-guard.service';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { SystemAdminComponent } from './system-admin/system-admin.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'newUser', component: NewUserComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'userProfile', component: NewUserComponent},
  {path: 'check-out', component: CheckOutComponent},
  {path: 'systemAdmin', component: SystemAdminComponent},

  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]},
  {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService]},
  {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService]},
  {path: 'systemAdmin', component: SystemAdminComponent, canActivate: [AuthGuardService]},

  {path: 'staff/sales-manager', component: SalesManagerComponent, canActivate: [AuthGuardService, SalesmanagerAuthGuardService]},
  {path: 'admin/manage-orders', component: ManageOrdersComponent, canActivate: [AuthGuardService, SalesmanagerAuthGuardService]},

  {path: 'custom', component: CustomComponent},
  {path: 'admin/custom/', component: CustomComponent},
  {path: 'admin/custom/:id', component: CustomComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},

  {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
  {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
  {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService]},
  {path: 'admin/inventory', component: AdminInventoryComponent, canActivate: [AuthGuardService]},
  {path: 'admin/inventories/new', component: InventoryFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
  {path: 'admin/inventories/:id', component: InventoryFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
  {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService, AdminAuthGuardService, SalesmanagerAuthGuardService]
})
export class AppRoutingModule { }
