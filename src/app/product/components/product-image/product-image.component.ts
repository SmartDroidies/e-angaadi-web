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
  slideIndex = 1;

  constructor(private productImageService: ProductImageService) { }

  ngOnInit(): void {
    this.collectProductImages(this.product);
    this.showSlides(this.slideIndex);
  }

  collectProductImages(product: Product) {
    this.productImages = this.productImageService.getProductImages(product);
  }

  plusSlides(n:number) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n:number) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n:number) {
    let i;
    let slides = document.getElementsByClassName("mySlides")as HTMLCollectionOf<HTMLElement>;
    let dots = document.getElementsByClassName("dot")as HTMLCollectionOf<HTMLElement>;
    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block" ;
    dots[this.slideIndex - 1].className += " active";
  }
}
