import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { UserComponent } from './user.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SignInComponent } from 'src/app/auth/pages/sign-in/sign-in.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  let windowSpy = {window: jasmine.createSpy('window')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent,SignInComponent],
      imports: [RouterTestingModule,MatIconModule,MatDividerModule,MatMenuModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        {provide:Window,windowSpy}
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
   
  // it('should signout', () => {
  //   component.signOut();
  //   fixture.detectChanges();
  //   expect (routerSpy.window)
  // });
});
