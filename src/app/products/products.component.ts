import {CategoryService} from '../category.service';
import {Category} from '../models/category';
import {Product} from '../models/product';
import {ProductService} from '../product.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[];
  filteredProducts: Product[];
  category: Category[];
  selectedCategory: string;

  constructor(productService: ProductService, categoryService: CategoryService, route: ActivatedRoute) {
    productService.getAll().subscribe(p => this.filteredProducts =  this.products = p);
    categoryService.getAll().subscribe(c => this.category = c);

    route.queryParamMap.subscribe(params => {
      this.selectedCategory = params.get('category');
      this.filteredProducts = (this.selectedCategory) ? 
      this.products.filter(p => p.category === this.selectedCategory) : this.products;

    });

      }


}
