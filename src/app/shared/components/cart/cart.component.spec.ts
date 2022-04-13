import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent,CartSummaryComponent],
      imports: [RouterTestingModule,MatIconModule,MatBadgeModule],
      providers: [
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should navigate to cart', () => {
  //   component.onCart();
  //   fixture.detectChanges();
  //   expect (routerSpy.navigate).toHaveBeenCalledWith(['/cart']);
  // });
});
