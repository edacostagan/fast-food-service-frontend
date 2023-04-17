import { TestBed } from "@angular/core/testing";
import { AuthGuard } from "./auth.guard";
import { AppModule } from "../../app.module";
import { UserApiService } from "../services/user.service";
import { state } from "@angular/animations";
import { UserEntity } from "src/app/domain/models/entities/user.entity";
import { Router } from "@angular/router";

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let userService: jasmine.SpyObj<UserApiService>;
  let router: jasmine.SpyObj<Router>;
  let route: any;
  let state: any;

  beforeEach(() => {

    userService = jasmine.createSpyObj('UserApiService', ['updateCurrentUser']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    guard = new AuthGuard(userService, router);

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when the user is not admin and has a valid token', () => {
    // Arrange
    const user: UserEntity = ({
      token: 'valid-token',
      userIsAdmin: false,
      _id: '01',
      userEmail: 'test@mail.com',
      userFullname: 'john doe',
      userAddress: 'mock',
      userMobilePhone: 'no'
    });

    userService.updateCurrentUser(user);

    //spyOn(userService, 'currentUser').and.returnValue(user) ;

    // Act
    const canActivate = guard.canActivate(route, state);

    // Assert
    expect(canActivate).toBeTrue();

  });

});

