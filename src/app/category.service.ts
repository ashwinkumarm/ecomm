import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';



@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) {
  }

  getAll() {
    return this.db.list('/categories', ref =>
    ref.orderByValue()).snapshotChanges().map(actions => {
        return actions.map(action => ({
          key: action.key,
          name: action.payload.val().name
        }));
      });
  }
}
