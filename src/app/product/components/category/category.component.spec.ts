import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../../service/product.service';

import { CategoryComponent } from './category.component';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [RouterTestingModule,HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('product groups should be populated from service', () => {
    component.ngOnInit();
    fixture.detectChanges();
    console.log("Product Group Length : ", component.productGroups.length);
    expect(component.productGroups.length).toBeGreaterThan(0);
  });

  it('on groups change event emits', () => {
    component.productGroupEvent.pipe().subscribe((selectedGroup: string) => expect(selectedGroup).toBe('Some Code'));
    component.onGroupChange("Some Code");
    fixture.detectChanges();
  });
});
