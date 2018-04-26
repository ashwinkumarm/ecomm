import { AuthService } from '../auth.service';
import {Cart} from '../models/cart';
import {Order} from '../models/order';
import {Shipping} from '../models/shipping';
import { OrderService } from '../order.service';
import {ShoppingCartService} from '../shopping-cart.service';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping: Shipping = {name: '', addressLine1: '', addressLine2: '', city: ''};
  cart: Cart;
  cartsubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(private shoppingCartService: ShoppingCartService,
     private orderService: OrderService, private authService: AuthService) {}

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartsubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    this.orderService.storeOrder(order);
  }

  ngOnDestroy() {
    this.cartsubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
