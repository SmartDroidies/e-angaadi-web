/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cartItem';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { ProductImage } from '../models/product-image';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {



  getAllProductImages(): any | undefined {
    const allProductImagesStr = localStorage.getItem("product-images");
    //FIXME - If the local storage for images is empty get it from server
    if (allProductImagesStr != null) {
      const allProductImages = JSON.parse(allProductImagesStr);
      return allProductImages;
    }
    return undefined;
  }

  processUrl(productImage: ProductImage): void {
    productImage.url = environment.imageBaseUrl.concat(productImage.url);
  }


  getProductImages(product: Product): ProductImage[] {
    const allProductImages = this.getAllProductImages();
    if (allProductImages != null) {
      let productImages: ProductImage[];
      if (allProductImages[product.code]) {
        productImages = allProductImages[product.code] as ProductImage[];
      }
      else {
        productImages = allProductImages[product.group];
      }
      if (productImages.length > 0) {
        productImages.forEach(productImage => this.processUrl(productImage))
      }
      return productImages;
    } else {
      this.getAllProductImages();
      return this.getProductImages(product);
    }
  }

  getCartImages(cart: CartItem): ProductImage {
    const allCartImages = this.getAllProductImages();
    if (allCartImages != null) {
      let productImages: ProductImage[];
      if (allCartImages[cart.code]) {
        productImages = allCartImages[cart.code];
      }
      else {
        productImages = allCartImages[cart.group];
      }
      if (productImages.length > 0) {
        productImages.forEach(productImage => this.processUrl(productImage))
      }
      return productImages[0];
    } else {
      this.getAllProductImages();
      return this.getCartImages(cart);
    }
  }

  getCategoryImages(category: string): ProductImage {
    const allCategoryImages = this.getAllProductImages();
    if (allCategoryImages != null) {
      let productImages: ProductImage[];
        if (allCategoryImages[category]) {
        productImages = allCategoryImages[category];
      }
      else {
        productImages = allCategoryImages['pulse'];
      }
      if (productImages.length > 0) {
        productImages.forEach(productImage => this.processUrl(productImage))
      }
      return productImages[0];
    } else {
      this.getAllProductImages();
      return this.getCategoryImages(category);
    }
  }
}
