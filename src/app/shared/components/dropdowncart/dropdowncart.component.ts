import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-dropdowncart',
  templateUrl: './dropdowncart.component.html',
  styleUrls: ['./dropdowncart.component.scss']
})
export class DropdowncartComponent implements OnInit {
  items = this.cartService.getCart();
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

}
