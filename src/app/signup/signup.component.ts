import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;
  confpassword: string;
  fName: string;
  lName: string;
  role: 'user';
  isUser: true;
  error: '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private flashMessage: NgFlashMessageService
  ) { }

  ngOnInit() {
  }

  onSubmit(value) {
      console.log(value);
      // VALIDATION FOR PASSWPRD CONFIRMATION
      if (value.password !== value.confpassword){
        window.alert ('Passwords don\'t match') ;
        // this.error = 'Passwords don\'t match';
        return;
      }
      this.email = value.email;
      this.password = value.password;
      this.isUser = true ;

      // SUBMITTING VALUES TO DATABASE USING REGISTER FUNCTION THROUGH APPUSER MODEL USING AUTHSERVICE
      this.auth.register(this.email, this.password, this.fName, this.role, this.isUser )
      .then(res => {
        this.router.navigate(['/menu']);
      }
      )
        .catch(err => {
          this.flashMessage.showFlashMessage({
            messages: ['Invalid'],
            type: 'danger', timeout: 4000
        });
  });
  }

}
