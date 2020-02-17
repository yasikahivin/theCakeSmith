import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { AppUser } from '../../../app/models/app-user';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-system-admin',
  templateUrl: './system-admin.component.html',
  styleUrls: ['./system-admin.component.scss']
})
export class SystemAdminComponent implements OnInit {
  users: AppUser[] ;
  subscription: Subscription;
  SysUsers: any[];
  isSubmitted: boolean;
  id: string;
  userdetail: AppUser = { name: '', email: '', isAdmin: false , isSalesM: false , isStockM: false , isUser: true , role: ''  };
  formTemplate = new FormGroup({
    name : new FormControl(''),
    email : new FormControl(''),
    role : new FormControl(''),
    isAdmin : new FormControl(false),
    isUser : new FormControl(true),
    isStockM : new FormControl(false),
    isSalesM : new FormControl(false),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private  route: ActivatedRoute) {
    this.subscription = this.userService.getall()
      .subscribe(users => this.SysUsers = this.users = users);

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id) { this.userService.get(this.id).pipe(take(1)).subscribe(u => this.userdetail = u ); }
  }

  save(userdetail: any) {
    this.isSubmitted = true;
    // this.userService.update(this.id, userdetail);
    if (this.formTemplate.valid && !this.id) {
      this.userService.create(userdetail);
    } else if (this.id) {
      this.userService.update(this.id, userdetail);
    }
    console.log(userdetail);
    this.router.navigate(['/sytemAdmin']);
}

  filter(query: string) {
    this.SysUsers = (query) ?
    this.users.filter(u => u.name.toLowerCase().includes(query)) :
    this.users;
  }

  delete() {
    if (!confirm('Do you want to delete this user from the system?')) { return; }
    this.userService.delete(this.id);
    this.router.navigate(['/']);
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }


  ngOnInit() {}

  get formControls() {
    return this.formTemplate.controls;
  }

}
