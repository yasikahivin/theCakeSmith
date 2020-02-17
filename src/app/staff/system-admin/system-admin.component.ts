import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { AppUser } from '../../../app/models/app-user';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';


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
    private router: Router) {
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
    this.db.object('/users/' + id).update({isAdmin: true , role: 'Admin'});
  }

  UpdateSalesM(id) {
    this.db.object('/users/' + id).update({isSalesM: true , role: 'SalesM'});
  }

  UpdateStockM(id) {
    this.db.object('/users/' + id).update({isStockM: true, role: 'stockM'});
  }

  delete(id) {
    if (!confirm('Do you want to delete this user from the system?')) { return; }
    this.db.object('/users/'+ id);
    this.userService.delete(this.id);
    this.router.navigate(['/']);
  }



    ngOnInit() {}

}
