import { TestBed } from "@angular/core/testing";
import { AuthGuard } from "./auth.guard";
import { AppModule } from "../../app.module";
import { HttpClient } from '@angular/common/http';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[],
      imports:[AppModule]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });


});

