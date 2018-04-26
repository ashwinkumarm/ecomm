import {AppUser} from './models/app-user';
import {UserService} from './user.service';
import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login(username, password) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithEmailAndPassword(username, password).catch(function(error) {

      var errorCode = error.code;
        var errorMessage = error.message;
         if (errorCode === 'auth/invalid-email') {
          alert('Wrong email.');
        }
        
        else if (errorCode === 'auth/user-not-found') {
          alert('User not found.');
        }
        else if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }

    });
  }
  googleLogin() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
 register(user) {
   
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {

      var errorCode = error.code;
        var errorMessage = error.message;

         if (errorCode === 'auth/email-already-in-use') {
          alert('Email already in use.');
        }
        else if (errorCode === 'auth/invalid-email') {
          alert('Invalid email');
        }
        
       else if (errorCode === 'auth/weak-password') {
          alert('Weak password.');
        }
         else {
          alert(errorMessage);
        }

    });
}
  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) {return this.userService.get(user.uid).valueChanges();}

        return Observable.of(null);
      });

  }
}
