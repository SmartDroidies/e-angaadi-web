import { ProductImage } from './../../models/product-image';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductImageService } from '../../service/product-image.service';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent implements OnInit {
  @Input() product!: Product;
  productImages!: ProductImage[];

  constructor(private productImageService: ProductImageService) { }

  ngOnInit(): void {
    this.collectProductImages(this.product);
  }

  collectProductImages(product: Product) {
    this.productImages = this.productImageService.getProductImages(product);
  }

}
