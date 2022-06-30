import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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

  processUrl(productImage: ProductImage): void {
    productImage.url = environment.imageBaseUrl.concat(productImage.url);
  }

  
  getProductImages(product: Product): ProductImage[] {
    const allProductImages = this.getAllProductImages();
      //FIXME - Try to get the category images if there is no images for code
    if (allProductImages != null) {
      let productImages: ProductImage[];
      if (allProductImages[product.code]) {
        productImages = allProductImages[product.code];
      }
      else {
        productImages = allProductImages[product.group];
      }
      if(productImages.length > 0) {
        productImages.forEach(productImage => this.processUrl(productImage))
      }
      return productImages;
    } else {
      this.getAllProductImages();
      return this.getProductImages(product);
    }
  }
}
