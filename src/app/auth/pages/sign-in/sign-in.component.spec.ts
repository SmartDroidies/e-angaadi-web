import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { SignInComponent } from './sign-in.component';
import { Router } from '@angular/router';

describe('SigninComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [RouterTestingModule,AmplifyUIAngularModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should navigate to home on signin', () => {
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   expect (routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  // });
});
