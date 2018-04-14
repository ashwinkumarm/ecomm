
import {AuthService} from './auth.service';
import {AppUser} from './models/app-user';
import {UserService} from './user.service';
import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';


@Injectable()
export class AdminAuthGuardService {

  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate() {
    if (this.userService.isAdmin()) {
      return true;
    }
    return false;
  }
}

