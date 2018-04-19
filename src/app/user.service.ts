import {AppUser} from './models/app-user';
import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  public user: firebase.User;

  constructor(private db: AngularFireDatabase) {}

  save(user: firebase.User) {
    this.user = user;
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }

}
