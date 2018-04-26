import {AuthService} from '../auth.service';
import { Cart } from '../models/cart';
import {Shipping} from '../models/shipping';
import {Order} from '../models/order';
import {OrderService} from '../order.service';
import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: Cart;
  shipping: Shipping = {name: '', addressLine1: '', addressLine2: '', city: ''};
  userSubscription: Subscription;
  userId: string;
  constructor(private orderService: OrderService, private authService: AuthService,
    private router: Router) {}


  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-sucess', result.key]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
