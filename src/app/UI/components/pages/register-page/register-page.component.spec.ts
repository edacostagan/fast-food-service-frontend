import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageComponent } from './register-page.component';
import { AppModule } from 'src/app/app.module';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  let validatorFn: ValidatorFn;

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

  describe('PasswordMatchValidator', () => {
    let formBuilder: FormBuilder;

    beforeEach(() => {
      formBuilder = new FormBuilder();
    });

    it('should return true when the passwords match', () => {
      // Arrange

      const pass = component.registerForm.controls['userPassword'];
      const confirm = component.registerForm.controls['confirmPassword'];

      pass.setValue('123456');
      confirm.setValue('123456');


      const validator = pass.value === confirm.value;

      // Act
      const result = validator;

      // Assert
      expect(result).toBeTrue();
    });

     it('should return false when the passwords do not match', () => {
      // Arrange
      const pass = component.registerForm.controls['userPassword'];
      const confirm = component.registerForm.controls['confirmPassword'];

      pass.setValue('123456');
      confirm.setValue('aaaa');

      const validator = pass.value === confirm.value;

      // Act
      const result = validator;

      // Assert
      expect(result).toBeFalse();
    });
  });




});
