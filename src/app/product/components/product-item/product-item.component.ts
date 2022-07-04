import { Component, Input, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/shared/models/cartItem';
import { CartService } from 'src/app/shared/service/cart.service';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  selectedUnit!: number;
  cartProductItems!: CartItem[];
  cartProductItem: CartItem | undefined;
  price!: any;
  userId!:string;
  signedIn = false;
  productImages!: any;

  constructor(private cartService: CartService, private toastr: ToastrService, private translate: TranslateService, private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProductsFromCart();
  }

  loadProductsFromCart() {
    this.cartProductItems = this.cartService.getCartProductItems(this.product.code);
    if (this.selectedUnit) {
      this.loadProductUnitFromCart(this.selectedUnit);
    }
  }

  getCartItemQuantity(currUnit: number) {
      // from(Auth.currentAuthenticatedUser()).subscribe((user) => {
      //   if (this.signedIn = true) {
      //    let userId = user.username;
      //     this.cartService.getCartItems(userId).subscribe((cartItems) => (this.cartProductItems = cartItems));
      //   }
      // });
    
      const allItems = this.cartService.getCart();
      let qtyInCart = 0;
      allItems.forEach((item) => {
        if (item.unit == currUnit) {
          qtyInCart = item.quantity;
        }
      });
      return qtyInCart;
  }

  selectChip(item: MatChip, unit: number, price: number) {
    item.selected = !item.selected;
    this.selectedUnit = unit;
    this.loadProductUnitFromCart(unit);
    this.preparePrice(price);
  }

  preparePrice(clickedUnitPrice: number) {
    this.price = '₹' + clickedUnitPrice ;
  }

  loadProductUnitFromCart(unit: number) {
    this.cartProductItem = this.cartProductItems.find((item) => item.unit === unit);
  }

  addUnit() {
    this.addToCart(this.product);
  }

  subUnit() {
    this.removeFromCart(this.product);
  }

  addToCart(product: Product) {
    if (this.selectedUnit) {
      product.flag=false;
      this.cartService.updateCart(product, this.selectedUnit, +1);
      this.loadProductsFromCart();
    } else {
      this.toastr.warning('Select unit before adding', 'Error');
    }
  }

  removeFromCart(product: Product) {
    if (this.selectedUnit) {
      this.cartService.updateCart(product, this.selectedUnit, -1);
      this.loadProductsFromCart();
    }

  }

  isInCart() {
    const cartProductUnitItem = this.cartProductItems.find((item) => item.unit === this.selectedUnit);
    return cartProductUnitItem != null && cartProductUnitItem.quantity > 0 ? true : false;
  }

  isProductUnitInCart(unit: number) {
    const cartProductUnitItem = this.cartProductItems.find((item) => item.unit === unit);
    return cartProductUnitItem != null ? true : false;
  }

  selectedProductUnitQuantity() {
    return this.cartProductItem ? this.cartProductItem.quantity : 0;
  }
}
