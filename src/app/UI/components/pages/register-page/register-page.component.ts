import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserApiService } from '../../../../infrastructure/services/user.service';
import { IUserRegister } from '../../../../domain/models/interfaces/user.interfaces';

import { ToastrService } from 'ngx-toastr';

/**
 * Register page - Allows to register new users
 * Validates the info provided and stores the data in
 * own DB and in Firebase service
 *
 * @export
 * @class RegisterPageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {

  firebaseToken!: string;
  registerForm!: FormGroup;
  isSubmitted: boolean = false;
  returnUrl: string = '';

  constructor(
    private builder: FormBuilder,
    private userService: UserApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
  ) { }


  /**
   * Method that is executed at the initialization of the component,
   * creates the register form and sets the validators for the data added
   * also sets the current page Url for future uses
   *
   * @memberof RegisterPageComponent
   */
  ngOnInit(): void {
    this.registerForm = this.builder.group({
      userFullname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      userAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      userEmail: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      userMobilePhone: ['', [Validators.maxLength(12)]],
      userPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required]]
    },
      { validators: passwordsMatchValidator() }
    );

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  /**
   * Getter that simplifies the process of getting the controls of the form
   *
   * @readonly
   * @memberof RegisterPageComponent
   */
  get fc() {
    return this.registerForm.controls;
  }


  /**
   * Sends the Register information to the user Service to be processed
   * If all goes right, the new user will be created and allow to login
   *
   * @return {*}
   * @memberof RegisterPageComponent
   */
  submit() {
    this.isSubmitted = true;

    if (this.registerForm.invalid) return;

    const fv = this.registerForm.value;

    const newUser: IUserRegister = {
      userFullname: fv.userFullname,
      userAddress: fv.userAddress,
      userEmail: fv.userEmail,
      userPassword: fv.userPassword,
      confirmPassword: fv.confirmPassword,
      userIsAdmin: false,
      userMobilePhone: fv.userMobilePhone
    }

    this.userService.registerWithFirebase(newUser.userEmail, newUser.userPassword)
      .then( response =>
        this.userService.registerUser(newUser)
          .subscribe((response) => {
            this.toastrService.success(
              `Welcome to Fast Food Service ${response.userFullname}!`,
              'Register Successful');
            this.router.navigateByUrl(this.returnUrl);
          })
      )
      .catch(error => {
        this.toastrService.error(
          error.message,
          'Register Failed!');
      })
  }
}

/**
 * Verify password
 */
function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('userPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password != confirmPassword) {

      control.get('confirmPassword')?.setErrors({notMatch : true});

      return {
        passwordsDontMatch: true
      }
    }
    return null;
  }
}
