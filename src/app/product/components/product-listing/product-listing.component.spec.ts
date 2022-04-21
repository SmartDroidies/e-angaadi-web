import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductListingComponent } from './product-listing.component';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from '../../service/product.service';
import { SimpleChange } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

describe('ProductListingComponent', () => {
  let component: ProductListingComponent;
  let fixture: ComponentFixture<ProductListingComponent>;


  beforeEach(async () => {
    const spyProductService = jasmine.createSpyObj('ProductService', [
      'getProducts',
    ]);
    spyProductService.getProducts.and.returnValue(of([{ code: 'product_1' }, { code: 'product_2' }]));
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,MatCardModule
      ],
      declarations: [ProductListingComponent],
      providers: [{ provide: ProductService, useClass: ProductService, useValue: spyProductService }],
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('product list should be populated from service', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.products.length).toBeGreaterThan(0);
  });
  
   it('onchanges filter applied', () => {
    component.ngOnChanges(
      { productGroupCode: new SimpleChange("first", "second", true) });
    fixture.detectChanges();
    expect(component.productsByGroup).toBeTruthy();
  });

});
