import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from '../../components/category/category.component';
import { ProductListingComponent } from '../../components/product-listing/product-listing.component';

import { ManageProductComponent } from './manage-product.component';

describe('ManageProductComponent', () => {
  let component: ManageProductComponent;
  let fixture: ComponentFixture<ManageProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageProductComponent,CategoryComponent,ProductListingComponent],
      imports:[HttpClientModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('setProductGroup ', () => {
    component.setProductGroup("dummy");
    fixture.detectChanges();
    expect(component.productGroupCode).toBe("dummy");
  });

});
