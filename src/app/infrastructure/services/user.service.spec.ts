
import { UserApiService } from './user.service';
import { UserEntity } from 'src/app/domain/models/entities/user.entity';
import { IUserLogin } from 'src/app/domain/models/interfaces/user.interfaces';
import { of } from 'rxjs';
import { IUserRegister } from 'src/app/domain/models/interfaces/user.interfaces';


describe('UserService', () => {
  let userService: UserApiService;
  let auth: any;
  let router: any;
  let toastrService: any;
  let httpClientSpy: { post: jasmine.Spy };

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

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    userService = new UserApiService(httpClientSpy as any, auth as any, router as any, toastrService as any);

  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should return the current user data', () => {
    //Arrange
    const result: UserEntity = userService.currentUser;
    //Act
    userService.setCurrentUser(userData);
    //Assert
    expect(result).toEqual(userData);
    expect(result).toBeInstanceOf(UserEntity)
  });

  it('should return User data if the login is correct', (done: DoneFn) => {
    //Arrange
    const mockCredentials: IUserLogin = {
      userEmail: 'test@mail.com',
      userPassword: '123456'
    }
    const returnValue: UserEntity = userData;

    httpClientSpy.post.and.returnValue(of(returnValue));
    toastrService.success();

    //Act
    userService.userLogin(mockCredentials).subscribe((result) => {
      //Assert
      expect(result).toEqual(userData);
      done();
    })
  });

  it('should register a new user and return the data stored', (done) => {
    //Arrange
    const newUser: IUserRegister = {
      ...userData,
      userPassword: '123456',
      confirmPassword: '123456'
    }
    const expectedResult: UserEntity = userData;

    httpClientSpy.post.and.returnValue(of(expectedResult));
    //Act

    userService.registerUser(newUser).subscribe((result)=>{
      expect(result).toEqual(expectedResult)
      done();
    })


    //Assert

  });


});
