import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent  implements OnInit {
  email: string;
  password: string;
  appUser: AppUser;

  constructor(
    private auth: AuthService,
    private db: AngularFirestore,
    private router: Router,
    private flashMessage: NgFlashMessageService
    ) {
  }

  ngOnInit() {

  }

  login() {
    this.auth.login();
  }

  onSubmit() {
    this.auth.login2(this.email, this.password)
      .then(res => {
        this.flashMessage.showFlashMessage({
          messages: ['You are now logged in'],
          type: 'success',
          timeout: 4000
        });

        if (!confirm('You are now logged in to the system')) { return; }
      })
        .catch(err => {
          this.flashMessage.showFlashMessage({
            messages: ['Invalid'],
            type: 'danger', timeout: 4000
        });
          if (!confirm('Incorrect login info!!! Recheck your username and password')) { return; }
  });
}

}
