import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app/services/user.service';
import { Subscription } from 'rxjs';
import { AppUser } from '../../app/models/app-user';

@Component({
  selector: 'app-system-admin',
  templateUrl: './system-admin.component.html',
  styleUrls: ['./system-admin.component.scss']
})
export class SystemAdminComponent implements OnInit {
  users: AppUser[] ;
  subscription: Subscription;
  SysUsers: any[];

  constructor(private userService: UserService) {
    this.subscription = this.userService.getall()
      .subscribe(users => this.SysUsers = this.users = users);
  }

  ngOnInit() {
  }

}
