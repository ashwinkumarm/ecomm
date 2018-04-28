import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) {}

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products/')
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => ({
          key: action.key,
          title: action.payload.val().title,
          imageUrl: action.payload.val().imageUrl,
          price: action.payload.val().price,
          category: action.payload.val().category
        }));
      });
  }

  getFilter(search?: string) {
    console.log(search);
    return this.db.list('/products/', ref => ref.orderByChild("title").startAt(search)).snapshotChanges()
    .map(actions => {
        return actions.map(action => ({
          key: action.key,
          title: action.payload.val().title,
          imageUrl: action.payload.val().imageUrl,
          price: action.payload.val().price,
          category: action.payload.val().category
        }));
      });
  }

  getProduct(productId) {
    return this.db.object('/products/' + productId).snapshotChanges();
  }

  update(productId, product) {
    return this.db.object('products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('products/' + productId).remove();
  }

}
