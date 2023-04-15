import { TestBed } from '@angular/core/testing';

import { UserApiService } from './user.service';
import { AppModule } from '../../../app/app.module';

describe('UserService', () => {
  let service: UserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AppModule]
    });
    service = TestBed.inject(UserApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
