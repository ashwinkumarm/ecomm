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
  @Input('shopping-cart') shoppingCart;

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

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) {return 0;}
    const item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
