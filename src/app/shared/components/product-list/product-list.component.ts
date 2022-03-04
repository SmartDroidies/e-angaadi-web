import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(private productservice: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.products = this.productservice.getproducts();
  }
  onProductItem(code: string) {
    this.router.navigate(['/productdetail', code]);
  }
}
