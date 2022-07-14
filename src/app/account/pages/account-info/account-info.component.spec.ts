import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AccountInfoComponent } from './account-info.component';

describe('AccountInfoComponent', () => {
  let component: AccountInfoComponent;
  let fixture: ComponentFixture<AccountInfoComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountInfoComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to profile', () => {
    component.personalInformation();
    fixture.detectChanges();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/account/account-info/profile']);
  });

  it('should navigate to profile', () => {
    component.address();
    fixture.detectChanges();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/account/account-info/address']);
  });
});
