import {CategoryService} from '../category.service';
import {Category} from '../models/category';
import {Product} from '../models/product';
import {ProductService} from '../product.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string;

  constructor(productService: ProductService, route: ActivatedRoute) {
    productService.getAll().switchMap(p => {
      this.products = p;
      return route.queryParamMap;
    }).subscribe(params => {
      this.selectedCategory = params.get('category');

      this.filteredProducts = (this.selectedCategory) ?
        this.products.filter(p => p.category === this.selectedCategory) : this.products;

      console.log(this.filteredProducts);
    });

  }


}
