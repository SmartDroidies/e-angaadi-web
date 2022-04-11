import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDetailComponent } from './cart-detail.component';

describe('CartdetailComponent', () => {
  let component: CartDetailComponent;
  let fixture: ComponentFixture<CartDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should populate cart items', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.getCart).toBeTruthy();
  });
});
