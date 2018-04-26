import {Order} from '../../models/order';
import {OrderService} from '../../order.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {

  orders$;

  constructor(private orderService: OrderService) {
    this.orders$ = orderService.getOrders();
  }
}
