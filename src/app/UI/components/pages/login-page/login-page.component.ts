import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserApiService } from '../../../../infrastructure/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(
    private readonly builder: FormBuilder,
    private readonly userService: UserApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private toastrService: ToastrService,
  ) { }


  ngOnInit(): void {

    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit() {
    this.isSubmitted = true;

    if (this.loginForm.invalid) return;

    const email = this.fc['email'].value;
    const password = this.fc['password'].value

    this.userService.loginWithFirebase(email, password)
      .then(response => {

        this.userService.userLogin({
          userEmail: email,
          userPassword: password
        }).subscribe(() => {

          this.router.navigateByUrl(this.returnUrl);

        });

      })
      .catch(error => {
        this.toastrService.error(
          error.message,
          'Login Failed!');
      })
  }

}
