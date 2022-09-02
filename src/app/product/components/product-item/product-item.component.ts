import { Component, Input, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/shared/models/cartItem';
import { CartService } from 'src/app/shared/service/cart.service';
import { StorageService } from 'src/app/shared/service/storage.service';
import { Product } from '../../models/product';
import { UnitPrice } from '../../models/unit-price';

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
  signedIn = false;
  productImages!: any;
  productInSavedList = false;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.loadProductsFromCart();
    this.isSavedItem();
    this.setDefaultUnit();
  }

  setDefaultUnit() {
    if (this.product.default) {
      this.selectedUnit = this.product.default;
      const findProduct = this.product.units.find((item) => item.unit === this.product.default);
      this.price = findProduct?.price;
      if (findProduct != undefined) {
        findProduct.default = true;
      }
    }
  }

  loadProductsFromCart() {
    this.cartProductItems = this.cartService.getCartProductItems(this.product.code);
    if (this.selectedUnit) {
      this.loadProductUnitFromCart(this.selectedUnit);
    }
    this.isSavedItem();
  }

  selectChip(item: MatChip, unit: number, price: number) {
    item.selected = !item.selected;
    this.selectedUnit = unit;
    this.loadProductUnitFromCart(unit);
    this.preparePrice(price);
    this.isSavedItem();
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
      this.isSavedItem();
    } else {
      this.toastr.warning('Select unit before adding', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }

  removeFromCart(product: Product) {
    if (this.selectedUnit) {
      this.cartService.updateCart(product, this.selectedUnit, -1, this.price);
      this.loadProductsFromCart();
      this.isSavedItem();
    }
  }

  isInCart() {
    const cartProductUnitItem = this.cartProductItems.find((item) => item.unit === this.selectedUnit);
    return cartProductUnitItem != null && cartProductUnitItem.quantity > 0 ? true : false;
  }

  loadProductUnitFromCart(unit: number) {
    this.cartProductItem = this.cartProductItems.find((item) => item.unit === unit);
  }

  isSavedItem(): void {
    const savedProductItems = this.storageService.getSavedItemByProduct(this.product.code);
    if (savedProductItems.length > 0) {
      this.productInSavedList = true;
    } else {
      this.productInSavedList = false;
    }
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
      const saveProduct = this.cartService.toCartItem(product, this.selectedUnit, +1, this.price);
      this.cartService.updateCartSaveStatus(saveProduct, true);
      this.isSavedItem();
    } else {
      this.toastr.warning('Select unit before adding', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }

  removeFromList(product: Product) {
    const removeProduct = this.cartService.toCartItem(product, this.selectedUnit, 0, this.price);
    this.cartService.removeItemInCart(removeProduct);
    this.isSavedItem();
  }
}
