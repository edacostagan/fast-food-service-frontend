import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';
import { AppModule } from '../../../app/app.module';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AppModule]
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
