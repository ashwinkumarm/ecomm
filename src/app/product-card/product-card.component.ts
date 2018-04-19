import {Cart} from '../models/cart';
import {Product} from '../models/product';
import {ShoppingCartService} from '../shopping-cart.service';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('showActions') showActions = true;
  @Input('shopping-cart') shoppingCart: Cart;

  constructor(private cartService: ShoppingCartService) {
  }

  //  getStyleHeight() {
  //    if (this.showActions) return '15rem;'; else return '15rem;';
  //  }
  //
  //  getStyleWidth() {
  //    if (this.showActions) return '15rem;'; else return '15rem;';
  //  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
