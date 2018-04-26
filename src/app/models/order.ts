import {Cart} from './cart';
import {Shipping} from './shipping';

export class Order {
  datePlaced: number;
  items: any[];
  totalCost: number;

  constructor(private userId: string, private shipping: Shipping, shoppingCart: Cart) {
    this.datePlaced = new Date().getTime();
    this.totalCost = shoppingCart.totalPrice;
    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price
        }, quantity: i.quantity,
        totalPrice: i.totalPrice
      };
    })
  }
}