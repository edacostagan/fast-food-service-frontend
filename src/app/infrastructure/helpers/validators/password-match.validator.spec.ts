import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordsMatchValidator } from '../validators/password-match.validator';

describe('PasswordsMatchValidator', () => {
  let form: FormGroup;

  beforeEach(() => {
      form = new FormGroup({
      password: new FormControl(),
      confirmPassword: new FormControl(),
    }
    )
  }
  )

  it('should set errors when the passwords do not match', () => {
    // Arrange
    form.patchValue({
      password: 'password1',
      confirmPassword: 'password2',
    });

    // Act
    form.updateValueAndValidity();

    // Assert
    const result = form.get('confirmPassword');
    expect(result).toBeFalse();
  });
})

  /* it('should remove errors when the passwords match', () => {
    // Arrange
    form.patchValue({
      password: 'password',
      confirmPassword: 'password',
    });
    form.get('confirmPassword').setErrors({ notMatch: true });

    // Act
    form.updateValueAndValidity();

    // Assert
    expect(form.get('confirmPassword').hasError('notMatch')).toBeFalse();
  });

  it('should not set errors if the form controls are not found', () => {
    // Arrange
    form = new FormGroup({
      password: new FormControl(),
    }, PasswordsMatchValidator('password', 'confirmPassword'));

    // Act
    form.updateValueAndValidity();

    // Assert
    expect(form.get('password').valid).toBeTrue();
  }); */
