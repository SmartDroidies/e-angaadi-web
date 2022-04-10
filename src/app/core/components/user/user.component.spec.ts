import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [RouterTestingModule,MatMenuModule],
      providers: [
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should trigger inituser()', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.initUser).toBeTruthy();
  });
   
  it('should navigate to signin', () => {
    component.signIn();
    fixture.detectChanges();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/auth/sign-in']);
  });
   
});
