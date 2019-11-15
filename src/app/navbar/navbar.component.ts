import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  user$: Observable<firebase.User>;

  constructor(
    private auth: AuthService , 
    private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
   }


  logout() {
    this.auth.logout();
  }

}
