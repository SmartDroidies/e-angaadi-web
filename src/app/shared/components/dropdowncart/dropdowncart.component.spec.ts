import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdowncartComponent } from './dropdowncart.component';

describe('DropdowncartComponent', () => {
  let component: DropdowncartComponent;
  let fixture: ComponentFixture<DropdowncartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdowncartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdowncartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
