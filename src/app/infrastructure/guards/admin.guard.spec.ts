import { TestBed } from "@angular/core/testing";
import { AppModule } from "../../app.module";
import { UserApiService } from "../services/user.service";
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let userService: UserApiService;
  let router: any;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AppModule]
    });

    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if the user is authorized', () =>{
    //Arrange


    //Act

    //Assert

  });

});

