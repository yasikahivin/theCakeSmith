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
  fName: string;
  lName: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private flashMessage: NgFlashMessageService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.register(this.email, this.password, this.fName, this.lName)
    .then(res => {
      this.router.navigate(['/menu']);
      window.alert('You are registered and now logged in');
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
