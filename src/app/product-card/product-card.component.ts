import {Product} from '../models/product';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('showActions') showActions = true;

  constructor() {
  }

}
