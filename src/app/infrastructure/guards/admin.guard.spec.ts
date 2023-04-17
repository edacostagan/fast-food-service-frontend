import { Router } from '@angular/router';

import { AdminGuard } from './admin.guard';
import { UserApiService } from '../services/user.service';
import { UserEntity } from 'src/app/domain/models/entities/user.entity';


describe('AdminGuard', () => {
  let guard: AdminGuard;
  let userService: jasmine.SpyObj<UserApiService>;
  let router: jasmine.SpyObj<Router>;
  let route: any;
  let state: any;

  beforeEach(() => {

    userService = jasmine.createSpyObj('UserApiService', ['updateCurrentUser']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    guard = new AdminGuard(userService, router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when the user is an admin and has a valid token', () => {
    // Arrange
    const user: UserEntity = ({
      token: 'valid-token',
      userIsAdmin: true,
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
    //expect(router.navigate).not.toHaveBeenCalled();
  });

});



/* TestBed.configureTestingModule({
     imports: [RouterTestingModule],
     providers: [
       AdminGuard,
       { provide: UserApiService, useValue: userService }
     ]
   });

   guard = TestBed.inject(AdminGuard);
   route = {} as ActivatedRouteSnapshot;
   state = {} as RouterStateSnapshot; */



/* import { TestBed } from "@angular/core/testing";
import { UserApiService } from "../services/user.service";
import { AdminGuard } from './admin.guard';
import { Router } from "@angular/router";

describe('AdminGuard', () => {
  let adminGuard: AdminGuard;
  let userService: UserApiService;
  let router: Router;



  beforeEach(() => {

    userService = jasmine.createSpyObj('UserApiService', ['currentUser']);

    adminGuard = TestBed.inject(AdminGuard);
    router = TestBed.inject(Router);

  });

  it('should be created', () => {
    expect(adminGuard).toBeTruthy();
  });
});

 */
