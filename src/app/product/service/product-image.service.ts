import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductImage } from '../models/product-image';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  constructor(private productService: ProductService) { }

  getAllProductImages(): any {
    const allProductImagesStr = localStorage.getItem("product-images");
    //FIXME - If the local storage for images is empty get it from server
    if (allProductImagesStr != null) {
      const allProductImages = JSON.parse(allProductImagesStr);
      return allProductImages;
    }
  }

  getProductImages(product: Product): ProductImage {
    const allProductImages = this.getAllProductImages();
      //FIXME - Try to get the category images if there is no images for code
    if (allProductImages != null) {
      let productImages: any;
      if (allProductImages[product.code]) {
        productImages = allProductImages[product.code];
      }
      else {
        productImages = allProductImages[product.group];
      }
      return productImages;
    } else {
      this.getAllProductImages();
      return this.getProductImages(product);
    }
  }


}
