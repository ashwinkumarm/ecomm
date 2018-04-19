import {Cart} from './models/cart';
import {CartItems} from './models/cartItems';
import {Product} from './models/product';
import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {}

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  async getCart(): Promise<Observable<Cart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
      .map(x => {
        if (x.payload.val()) {
          return new Cart(x.payload.val().items);
        } else {
          return new Cart();
        }
      });
  }

  async removeFromCart(product: Product) {
    if (!product) return;
    const cartId = await this.getOrCreateCartId();
    const item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);

    item$.snapshotChanges().take(1).subscribe(item => {
      if (item.payload.exists()) {
        item$.update({quantity: item.payload.val().quantity - 1});
        if (item.payload.val().quantity === 0) {item$.remove();}
      } else {
        item$.set({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1
        });
      }
    });
  }


  async addToCart(product: Product) {
    if (!product) return;
    const cartId = await this.getOrCreateCartId();
    const item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
    item$.snapshotChanges().take(1).subscribe(item => {
      if (item.payload.exists()) {
        item$.update({quantity: item.payload.val().quantity + 1});
      } else {
        item$.set({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1
        });
      }
    });
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
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

}
