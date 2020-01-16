import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import {ModalDirective} from 'angular-bootstrap-md';
import { User } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'theCakesmith';
  @ViewChild (ModalDirective, { static: true, }) modal: ModalDirective;

  constructor(private authServive: AuthService, private auth: AuthService, router: Router, private userService: UserService) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.Save(user);
        const returnUrl = localStorage.getItem('returnUrl');

        if (returnUrl) {
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      }
    });

  }
}
