import {CategoryService} from '../../category.service';
import {Category} from '../../models/category';
import {Product} from '../../models/product';
import {ProductService} from '../../product.service';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories: Category[] = [];
  products:any = {};
  id;

  constructor(categoryService: CategoryService, private productService: ProductService,
    private router: Router, private routeParam: ActivatedRoute) {
    categoryService.getAll().subscribe(c => this.categories = c);

    this.id = this.routeParam.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id).take(1).subscribe(p => {
        this.products = p.payload.val();
      });
    }
  }

  ngOnInit() {
  }

  save(product: NgForm) {
    if (this.id) {this.productService.update(this.id, product.value);} else {this.productService.create(product.value);}

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you want to delete the product?')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
}
