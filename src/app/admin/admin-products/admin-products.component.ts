import {Product} from '../../models/product';
import {ProductService} from '../../product.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DataTableResource} from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {

    this.subscription = this.productService.getAll()
      .subscribe(p => {
        this.products = p;
        this.initializeTable(p);
      });
  }
  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset: 0})
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) {return;}

    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    const q = query.toLowerCase();
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(q)) :
      this.products;

    this.initializeTable(filteredProducts);
  }
}
