import { TestBed } from "@angular/core/testing";
import { AuthGuard } from "./auth.guard";
import { AppModule } from "../../app.module";
import { UserApiService } from "../services/user.service";

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let userService: UserApiService;
  let router: any;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AppModule]
    });

    guard = TestBed.inject(AuthGuard);
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

