import {AuthService} from '../auth.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {Cart} from '../models/cart';
import {OrderService} from '../order.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;

  constructor(private orderService: OrderService, private authService: AuthService) {
    this.orders$ = authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid));
  }
}
