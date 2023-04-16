import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageComponent } from './register-page.component';
import { AppModule } from 'src/app/app.module';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPageComponent],
      imports: [AppModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify password match confirmation, ', () => {
    //Arrange
    const password = component.registerForm.controls['userPassword'];
    const confirmPassword = component.registerForm.controls['confirmPassword'];

    const pass = "123456"
    const confirmPass = "123456"
    //Act
    password.setValue(pass);
    confirmPassword.setValue(confirmPass);

    //Assert
    expect(password.value).toEqual(confirmPassword.value);
  });

  it('should return the correct Control', () => {
    //Arrange
    const control = 'userFullname';

    //Act
    const result = component.fc[control];

    //Assert
    expect(result).toEqual(component.registerForm.controls[control]);
  });


  it('should return form invalid when given bad data', () => {
    //Arrange
    const userFullname = component.registerForm.controls['userFullname'];
    const userAddress = component.registerForm.controls['userAddress'];
    const userEmail = component.registerForm.controls['userEmail'];
    const userMobilePhone = component.registerForm.controls['userMobilePhone'];
    const userPassword = component.registerForm.controls['userPassword'];
    const confirmPassword = component.registerForm.controls['confirmPassword'];

    //Act
    userFullname.setValue('');
    userAddress.setValue('');
    userEmail.setValue('');
    userMobilePhone.setValue('');
    userPassword.setValue('');
    confirmPassword.setValue('');

    //Assert
    expect(component.registerForm.invalid).toBeTrue();

  });

});
