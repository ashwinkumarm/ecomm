import {CartItems} from './cartItems';

export class Cart {
  
  constructor(public items: CartItems) {
  }

  totalItemsCount() {
    let count = 0;
    for (const productId in this.items) {
      count += this.items[productId].quantity;
    }
    return count;
  }

  productIds() {
    return Object.keys(this.items);
  }
}
