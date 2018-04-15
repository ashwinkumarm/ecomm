import {CategoryService} from '../../category.service';
import {Category} from '../../models/category';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  category: Category[] = [];
  @Input('selectedCategory') selectedCategory;

  constructor(categoryService: CategoryService) {
    categoryService.getAll().subscribe(c => this.category = c);
  }

  ngOnInit() {
  }

}
