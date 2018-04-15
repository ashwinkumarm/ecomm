import { AppProduct } from '../../models/app-product';
import {ProductService} from '../../product.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  subscription: Subscription;
  filteredproducts: any[];

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(products => this.filteredproducts = this.products = products);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    const q = query.toLowerCase();
    this.filteredproducts = (query) ?
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(q)) :
      this.products;
  }
}
