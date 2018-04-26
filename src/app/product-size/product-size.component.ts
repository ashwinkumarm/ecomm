import {Cart} from '../models/cart';
import {Product} from '../models/product';
import {ShoppingCartService} from '../shopping-cart.service';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-product-size',
  templateUrl: './product-size.component.html',
  styleUrls: ['./product-size.component.css']
})
export class ProductSizeComponent {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: Cart;

  sizeArrayNumbers = [];
  pos: number;

  constructor(private cartService: ShoppingCartService) {
    this.pos = 0;
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  sizeArray() {
    let sizeDup = this.product.size.toString();
    if (sizeDup && sizeDup.includes(',')) {
      this.sizeArrayNumbers = sizeDup.split(',').map(Number).sort((n1, n2) => n1 - n2);
    } else {
      this.sizeArrayNumbers = [+sizeDup];
    }
    return this.sizeArrayNumbers;
  }

  showCurrentSize() {
    let sizeArray = this.sizeArray();
    return sizeArray[this.pos];
  }

  getNextSize() {
    this.pos = this.pos + 1;
    let sizeArray = this.sizeArray();
    if (this.pos > sizeArray.length - 1) this.pos = sizeArray.length - 1;
  }

  getPrevSize() {
    this.pos -= this.pos;
    let sizeArray = this.sizeArray();
    if (this.pos < 0) this.pos = 0;
  }

}
