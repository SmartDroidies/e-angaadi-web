import { Component, Input } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/service/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product!: Product;
  selectedUnit!: number;
  quantity = 0;

  constructor( private cartService: CartService,
    private toastr: ToastrService) {}

  selectChip(item: MatChip) {
    item.selected = !item.selected;
  }

  unitSelected(unit: number) {
    this.selectedUnit = unit;
  }

  addUnit() {
    this.addToCart(this.product);
  }

  subUnit() {
   this.removeFromCart(this.product)
  }

  addToCart(product: Product) {
    if (this.selectedUnit) {
      this.cartService.updateCart(product, this.selectedUnit,this.quantity+1);
    } else {
      () => {
        this.toastr.error('Select unit before adding', 'Error', {
          positionClass: 'toast-bottom-center',
        });
      };
    }
  }

  removeFromCart(product:Product){
    if (this.selectedUnit) {
      this.cartService.updateCart(product, this.selectedUnit,this.quantity-1);
    } 
  }

  isInCart(product:Product){
    let cartItem=this.cartService.getCartItem(product.code,1);
    if(cartItem==null){
      return false;
    }else{
      return true;
    }
  }
}
