import { Component, Input, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/shared/models/cartItem';
import { CartService } from 'src/app/shared/service/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit{
  @Input() product!: Product;
  selectedUnit!: number;
  quantity = 0;
  cartItem!:CartItem;

  //FixME-declare an cart item array
  //FixME-on ngonit method initilze/load cart items array
  // declare a array ,get cart item pani ng onit la ,andha product already irka nu check pani ,already irundha adhoda units edukanam by using method called load cart items.


  constructor( private cartService: CartService,
    private toastr: ToastrService) {}


  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    let cartItems=this.cartService.getCartItem(this.product.code,this.selectedUnit,this.quantity);
    if(cartItems){
      cartItems.code=this.product.code;
      cartItems.unit=this.selectedUnit;
      cartItems.qty=this.quantity;
    }

  }

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
      this.cartService.updateCart(product, this.selectedUnit,+1);
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
      this.cartService.updateCart(product, this.selectedUnit,-1);
    } 
  }

  isInCart(product:Product){
    let cartItem=this.cartService.getCartItem(product.code,1,1);
    if(cartItem==null){
      return false;
    }else{
      return true;
    }
  }

}
