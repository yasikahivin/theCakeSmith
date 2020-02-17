import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireObject, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {UserService} from 'src/app/services/user.service';
import {Router, ActivatedRoute } from '@angular/router';
import { take} from 'rxjs/operators';
import { CommonModule} from '@angular/common';

import {AppUser} from 'src/app/models/app-user';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  id: string;
  SysUsers: any[];
  appuser: AppUser = {name: '', email: '', isAdmin: false, isSalesM: false, isStockM: false, isUser: true, role: '', contactNum: ''};

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) { this.userService.get(this.id).pipe(take(1)).subscribe(i => this.appuser =i); }
   }

   save(appuser: any) {
     if (this.id) {
       this.userService.update(this.id, appuser);
     } else {
      //  this.userService.create(appuser);
     }
     console.log(appuser);
     this.router.navigate(['/menu']);
   }

  ngOnInit() {
  }

}
