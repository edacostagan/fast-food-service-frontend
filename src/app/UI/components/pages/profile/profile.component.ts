import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserEntity } from '../../../../domain/models/entities/user.entity';
import { IUserRegister, IUserUpdate } from '../../../../domain/models/interfaces/user.interfaces';
import { UserApiService } from '../../../../infrastructure/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: UserEntity;
  profileForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private builder: FormBuilder,
    private userService: UserApiService,
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
    this.profileForm = this.builder.group({
      userFullname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      userAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      userMobilePhone: ['', [Validators.maxLength(12)]],
    });

    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;

    })
    //this.user = this.userService.currentUser;
    this.updateFormInfo();

  }


  /**
   * updates the User info showed in the profile form
   *
   * @memberof ProfileComponent
   */
  updateFormInfo() {

    this.profileForm.patchValue({
      userFullname: this.user.userFullname,
      userEmail: this.user.userEmail,
      userAddress: this.user.userAddress,
      userMobilePhone: this.user.userMobilePhone,
    })
  }

  /**
   * Getter that simplifies the process of getting the controls of the form
   *
   * @readonly
   * @memberof RegisterPageComponent
   */
  get fc() {
    return this.profileForm.controls;
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

    if (this.profileForm.invalid) return;

    const fv = this.profileForm.value;

    const newUser: IUserUpdate = {
      userFullname: fv.userFullname,
      userAddress: fv.userAddress,
      userMobilePhone: fv.userMobilePhone,
      }

    this.userService.updateUser(this.user._id, newUser)
      .subscribe((response) => {
        this.toastrService.success(
          'User Information Updated!',
          `Congrats ${response.userFullname}`);

          window.location.reload();
      }
    )
  }



}
