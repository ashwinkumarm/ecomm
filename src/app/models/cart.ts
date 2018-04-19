import {CartItems} from './cartItems';
import {Product} from './product';

export class Cart {
  items: CartItems[] = [];

  constructor(private itemsMap?: {[productId: string]: CartItems}) {
    this.itemsMap = itemsMap || {};

    for (const productId in itemsMap) {
      const item = itemsMap[productId];

      this.items.push(new CartItems({...item, key: productId}));
    }
  }

  totalItemsCount() {
    let count = 0;
    for (const productId in this.items) {
      count += this.items[productId].quantity;
    }
    return count;
  }

  get totalPrice() {
    let sum = 0;
    for (const productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }

  getQuantity(product: Product) {
    if (product) {
      const item = this.itemsMap[product.key];
      return item ? item.quantity : 0;
    }
    return 0;
  }

}
