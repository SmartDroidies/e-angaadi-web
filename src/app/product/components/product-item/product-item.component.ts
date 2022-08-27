import { Component, Input, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/shared/models/cartItem';
import { CartService } from 'src/app/shared/service/cart.service';
import { StorageService } from 'src/app/shared/service/storage.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  selectedUnit!: number;
  cartProductItems!: CartItem[];
  cartProductSavedItems!: CartItem[];
  cartProductItem: CartItem | undefined;
  price!: number;
  signedIn = false;
  productImages!: any;
  saveList = false;

  constructor(private cartService: CartService, private toastr: ToastrService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.loadProductsFromCart();
    this.isSaveditemsInCart();
  }

  loadProductsFromCart() {
    this.cartProductItems = this.cartService.getCartProductItems(this.product.code);
    if (this.selectedUnit) {
      this.loadProductUnitFromCart(this.selectedUnit);
    }
    this.isSaveditemsInCart();
  }

  selectChip(item: MatChip, unit: number, price: number) {
    item.selected = !item.selected;
    this.selectedUnit = unit;
    this.loadProductUnitFromCart(unit);
    this.preparePrice(price);
    this.isSaveditemsInCart();
  }

  preparePrice(clickedUnitPrice: number) {
    this.price = clickedUnitPrice;
  }

  addUnit() {
    this.addToCart(this.product);
  }

  subUnit() {
    this.removeFromCart(this.product);
  }

  addToCart(product: Product) {
    if (this.selectedUnit) {
      this.cartService.updateCart(product, this.selectedUnit, +1, this.price);
      this.loadProductsFromCart();
      this.isSaveditemsInCart();
    } else {
      this.toastr.warning('Select unit before adding', 'Error');
    }
  }

  removeFromCart(product: Product) {
    if (this.selectedUnit) {
      this.cartService.updateCart(product, this.selectedUnit, -1, this.price);
      this.loadProductsFromCart();
      this.isSaveditemsInCart();
    }
  }

  isInCart() {
    const cartProductUnitItem = this.cartProductItems.find((item) => item.unit === this.selectedUnit);
    return cartProductUnitItem != null && cartProductUnitItem.quantity > 0 ? true : false;
  }

  loadProductUnitFromCart(unit: number) {
    this.cartProductItem = this.cartProductItems.find((item) => item.unit === unit);
  }

  isSaveditemsInCart() {
    this.cartProductSavedItems = this.storageService.getUserSavedItems();
    for (let i = 0; i < this.cartProductSavedItems.length; i++) {
      if (this.product.code === this.cartProductSavedItems[i].code) {
        if (this.cartProductSavedItems[i].saved) {
          return this.saveList == true;
        } else {
          return this.saveList == false;
        }
      }
    }
    return this.saveList == false;
  }

  isProductUnitInCart(unit: number) {
    const cartProductUnitItem = this.cartProductItems.find((item) => item.unit === unit);
    return cartProductUnitItem != null ? true : false;
  }

  getCartItemQuantity(unit: number) {
    const cartProductUnitItem = this.cartProductItems.find((item) => item.unit === unit);
    if (cartProductUnitItem) {
      return cartProductUnitItem.quantity;
    } else {
      return null;
    }
  }

  selectedProductUnitQuantity() {
    return this.cartProductItem ? this.cartProductItem.quantity : 0;
  }

  saveToList(product: Product) {
    if (this.selectedUnit) {
      this.saveList = true;
      const saveProduct = this.cartService.toCartItem(product, this.selectedUnit, +1, this.price);
      this.cartService.updateCartSaveStatus(saveProduct, true);
      this.isSaveditemsInCart();
    } else {
      this.toastr.warning('Select unit before adding', 'Error');
    }
  }

  removeFromList(product: Product) {
    if (this.selectedUnit) {
      this.saveList = false;
      const removeProduct = this.cartService.toCartItem(product, this.selectedUnit, 0, this.price);
      this.cartService.removeItemInCart(removeProduct);
      this.isSaveditemsInCart();
    } else {
      this.toastr.warning('Select unit before adding', 'Error');
    }
  }
}
