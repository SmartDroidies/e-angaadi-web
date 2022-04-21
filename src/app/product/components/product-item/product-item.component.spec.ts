import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from '../../components/category/category.component';
import { ProductListingComponent } from '../../components/product-listing/product-listing.component';
import { ViewProductComponent } from '../../pages/view-product/view-product.component';

import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProductComponent,CategoryComponent,ProductListingComponent],
      imports:[HttpClientModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
