import { Component, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import {ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'theCakesmith';
  @ViewChild (ModalDirective, { static: true, }) modal: ModalDirective;

  constructor(private userServive: UserService, private auth: AuthService, router: Router) {
    auth.user$.subscribe(user => {
      if (user) {

        const returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    });

  }
}
