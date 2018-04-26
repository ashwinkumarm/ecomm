import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
  
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(private auth: AuthService, private router: Router) {

  
  }

  ngOnInit() {
  }
  register(user: NgForm) {

    this.auth.register(user.value);
   
    

  //  this.router.navigate(['/']);
  }
}
