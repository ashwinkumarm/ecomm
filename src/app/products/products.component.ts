import {CategoryService} from '../category.service';
import {Cart} from '../models/cart';
import {Category} from '../models/category';
import {Product} from '../models/product';
import {ProductService} from '../product.service';
import {ShoppingCartService} from '../shopping-cart.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string;
  cart$: Observable<Cart>;

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private applyFilter() {
    this.filteredProducts = (this.selectedCategory) ?
      this.products.filter(p => p.category === this.selectedCategory) :
      this.products;
  }

  private populateProducts() {

    this.productService.getAll().switchMap(p => {
      this.products = p;
      return this.route.queryParamMap;
    }).subscribe(params => {
      this.selectedCategory = params.get('category');
      this.applyFilter();
    });
  }

  public populateFilterProducts(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLocaleLowerCase().startsWith(query.toLocaleLowerCase())) : this.products;

  }
}

