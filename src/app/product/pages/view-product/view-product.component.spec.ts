import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from '../../components/category/category.component';
import { ProductListingComponent } from '../../components/product-listing/product-listing.component';
import { ViewProductComponent } from './view-product.component';

fdescribe('ViewProductComponent', () => {
  let component: ViewProductComponent;
  let fixture: ComponentFixture<ViewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProductComponent,CategoryComponent,ProductListingComponent],
      imports:[HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('setProductGroup ', () => {
  //   component.setProductGroup("dummy");
  //   fixture.detectChanges();
  //   expect(component.productGroupCode).toBe("dummy");
  // });

});
