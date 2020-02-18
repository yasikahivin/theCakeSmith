import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import { Subscription } from 'rxjs';
import {UserService} from 'src/app/services/user.service';
import {Router, ActivatedRoute } from '@angular/router';
import { take} from 'rxjs/operators';
import { CommonModule} from '@angular/common';

import {AppUser} from 'src/app/models/app-user';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  id: string;
  users: AppUser[] ;
  subscription: Subscription;
  SysUsers: any[];
  appuser: AppUser = {name: '', email: '', isAdmin: false, isSalesM: false, isStockM: false, isUser: true, role: '', contactNum: ''};

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.subscription = this.userService.getall()
    .subscribe(users => {
      this.SysUsers = this.users = users;
      // console.log(this.SysUsers);
    }
    );
    this.id = this.afAuth.auth.currentUser.uid;
    console.log(this.id);
   }


   save(appuser: any) {
     if (this.id) {
      this.id = this.afAuth.auth.currentUser.uid;
      this.userService.update(this.id, appuser);
     } else {
     }
     console.log(appuser);
     console.log(this.id);
     this.router.navigate(['/menu']);
   }

  ngOnInit() {}


}
