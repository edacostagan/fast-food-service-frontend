import { TestBed } from '@angular/core/testing';

import { UserApiService } from './user.service';
import { AppModule } from '../../../app/app.module';
import { UserEntity } from 'src/app/domain/models/entities/user.entity';
import { IUserLogin } from 'src/app/domain/models/interfaces/user.interfaces';
import { of } from 'rxjs';
import { Auth } from '@firebase/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

describe('UserService', () => {
  let userHttpService: UserApiService;
  let userLocalService: UserApiService;
  let HttpClientSpy: { post: jasmine.Spy };
  let auth: Auth;
  let router: Router;
  let toastrService: ToastrService;

  //Arrange
  let userData: UserEntity = {
    _id: '001',
    userFullname: 'John Doe',
    userAddress: 'main st 123',
    userMobilePhone: '087654321',
    userEmail: 'test@mail.com',
    userIsAdmin: false,
    token: 'ljkñnfdqjdmf23j23mpo3oj23lkñrkj23frji302jfi32'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });

    HttpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    userHttpService = new UserApiService(HttpClientSpy as any, auth as any, router as any, toastrService as any);
    userLocalService = TestBed.inject(UserApiService);
  });

  it('should be created', () => {
    expect(userHttpService).toBeTruthy();
  });

  it('should return the current user data', () => {
    //Arrange
    const result = userLocalService.currentUser;
    //Act
    userLocalService.setCurrentUser(userData);
    //Assert
    expect(result).toEqual(userData);
  })

  it('should return User data if the login is correct', (done: DoneFn) => {
    //Arrange
    const mockCredentials: IUserLogin = {
      userEmail: 'test@mail.com',
      userPassword: '123456'
    }
    const returnValue: UserEntity = userData;

    HttpClientSpy.post.and.returnValue(of(returnValue));

    //Act
    userHttpService.userLogin(mockCredentials).subscribe((result) => {
      //Assert
      expect(result).toEqual(userData);
      done();
    })
  })

});
