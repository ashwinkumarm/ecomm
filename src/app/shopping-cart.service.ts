import { Cart } from './models/cart';
import {Product} from './models/product';
import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<Cart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
      .map( x => new Cart(x.payload.val().items));
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async removeFromCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);

    item$.snapshotChanges().take(1).subscribe(item => {
      if (item.payload.exists()) {
        item$.update({quantity: item.payload.val().quantity - 1});
      } else {
        item$.set({product: product, quantity: 1});
      }
    });

  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);

    item$.snapshotChanges().take(1).subscribe(item => {
      if (item.payload.exists()) {
        item$.update({quantity: item.payload.val().quantity + 1});
      } else {
        item$.set({product: product, quantity: 1});
      }
    });

  }
}
