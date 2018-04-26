import { Cart } from '../models/cart';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  
  @Input('cart') cart: Cart;

  constructor() { }

  ngOnInit() {
  }

}
