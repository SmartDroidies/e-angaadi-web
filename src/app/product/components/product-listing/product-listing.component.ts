import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { CartItem } from 'src/app/shared/models/cartItem';
import { CartService } from 'src/app/shared/service/cart.service';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit, OnChanges {
  @Input() productGroupCode!: string;
  products: Product[] = [];
  cartItems: CartItem[] = [];

  productsByGroup: Product[] = [];
  product!: Product;
  selectedUnit!: number;
  code!: string;
  quantity = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  //FIXME - Create a component for product

  ngOnInit(): void {
    this.getProducts();
    // this.loadCart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productGroupCode'] && changes['productGroupCode'].currentValue) {
      this.productsByGroup = this.products.filter(
        (product) => product.group === changes['productGroupCode'].currentValue
      );
    }
  }

  getProducts(): void {
    this.productService.getProducts('live').subscribe((products) => (this.products = products));
  }

  // loadCart() {
  //   //this.cartService.loadCart().
  //   throw new Error('Method not implemented.');
  // }

  // selectChip(item: MatChip) {
  //   item.selected = !item.selected;
  // }

  // unitSelected(unit: number) {
  //   this.selectedUnit = unit;
  // }

  addToCart(product: Product) {
    if (this.selectedUnit) {
      this.cartService.updateCart(product, this.selectedUnit, +1);
    } else {
      // FIXME - Display toaster to select unit
      () => {
        this.toastr.error('Select unit before adding', 'Error', {
          positionClass: 'toast-bottom-center',
        });
      };
    }
  }

  addUnit() {
    this.quantity = this.quantity + 1;
  }

  subUnit() {
    this.quantity = this.quantity - 1;
  }
}
