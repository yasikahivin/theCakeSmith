import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
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
  // firstName: string;
  // lastName: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private flashMessage: NgFlashMessageService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.register(this.email, this.password)
    .then(res => {
      this.flashMessage.showFlashMessage({
        messages: ['You are registered and now logged in'],
        type: 'success',
        timeout: 4000
      });
      this.router.navigate(['/menu']);
    })
      .catch(err => {
        this.flashMessage.showFlashMessage({
          messages: ['Invalid'],
          type: 'danger', timeout: 4000
      });
});
  }

}
