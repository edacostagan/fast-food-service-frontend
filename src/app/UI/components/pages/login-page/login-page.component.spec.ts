import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AppModule } from '../../../../app.module';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports:[AppModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should return form invalid when given bad credentials', () => {

    const email = component.loginForm.controls['email'];
    const password = component.loginForm.controls['password'];

    email.setValue('test#mail.com');
    password.setValue('');

    expect(component.loginForm.invalid).toBeTrue();

  });

  it('should return form invalid False when given correct credentials', () => {

    const email = component.loginForm.controls['email'];
    const password = component.loginForm.controls['password'];

    email.setValue('test@mail.com');
    password.setValue('123456');

    expect(component.loginForm.invalid).toBeFalse();

  });

})
