import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  constructor() { }

  getAllProductImages(): any {
    const allProductImagesStr = localStorage.getItem("product-images");
    //FIXME - If the local storage for images is empty get it from server
    if (allProductImagesStr != null) {
      const allProductImages = JSON.parse(allProductImagesStr);
      return allProductImages;
    } else {
      return null;
    }
  }

  getProductImages(code: string): any {
    const allProductImages = this.getAllProductImages();
    if (allProductImages != null) {
      const productImages = allProductImages[code];
      //FIXME - Try to get the category images if there is no images for code
      return productImages;
    }
  }


}
