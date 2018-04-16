import {CategoryService} from '../category.service';
import {Category} from '../models/category';
import {Product} from '../models/product';
import {ProductService} from '../product.service';
import {ShoppingCartService} from '../shopping-cart.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string;
  cart: any = {};
  subscription: Subscription;

  constructor(productService: ProductService, route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {
    productService.getAll().switchMap(p => {
        this.products = p;
      return route.queryParamMap;
    }).subscribe(params => {
      this.selectedCategory = params.get('category');

      this.filteredProducts = (this.selectedCategory) ?
        this.products.filter(p => p.category === this.selectedCategory) : this.products;
    });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
