import {AuthService} from '../auth.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: any = {};
  constructor(private auth: AuthService) {
  }

  login() {
    console.log(this.model.username, this.model.password);
    this.auth.login(this.model.username, this.model.password);
  }
  googleLogin() {
    this.auth.googleLogin();
  }

}
