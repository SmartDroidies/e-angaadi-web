import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveLaterComponent } from './save-later.component';

describe('SaveLaterComponent', () => {
  let component: SaveLaterComponent;
  let fixture: ComponentFixture<SaveLaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveLaterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
