import { ShoppingCartService } from './shopping-cart.service';
import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService:ShoppingCartService) {}

  async placeOrder(order) {
    let result =  this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

}
