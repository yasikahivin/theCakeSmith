import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { AppUser } from '../../../app/models/app-user';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-system-admin',
  templateUrl: './system-admin.component.html',
  styleUrls: ['./system-admin.component.scss']
})
export class SystemAdminComponent implements OnInit, OnDestroy {
  users: AppUser[] ;
  subscription: Subscription;
  SysUsers: any[];
  isSubmitted: boolean;
  id: string;

  constructor(
    private userService: UserService,
    private db: AngularFireDatabase,
    private router: Router,
    private afAuth: AngularFireAuth) {
    this.subscription = this.userService.getall()
    .subscribe(users => {
      this.SysUsers = this.users = users;

    } );
    // console.log(this.SysUsers);

  }


  filter(query: string) {
    this.SysUsers = (query) ?
    this.users.filter(u => u.name.toLowerCase().includes(query)) :
    this.users;
   // console.log(this.SysUsers);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  UpdateAdmin(id) {
    this.db.object('/users/' + id).update({isAdmin: true , isSalesM: false, isStockM: false, isUser: false, role: 'Admin'});
  }

  UpdateUser(id) {
    this.db.object('/users/' + id).update({isUser: true , isSalesM: false, isStockM: false, isAdmin: false, role: 'User'});
  }

  UpdateSalesM(id) {
    this.db.object('/users/' + id).update({isSalesM: true , isAdmin: false , isStockM: false, isUser: false, role: 'SalesM'});
  }

  UpdateStockM(id) {
    this.db.object('/users/' + id).update({isStockM: true, isAdmin: false , isSalesM: false, isUser: false, role: 'StockM'});
  }

  delete(id) {
    if (!confirm('Do you want to delete this user from the system?')) { return; }
    this.db.object('/users/' + id).remove();
    // this.userService.delete(this.id);
    this.router.navigate(['/systemAdmin']);
  }



    ngOnInit() {}

}
