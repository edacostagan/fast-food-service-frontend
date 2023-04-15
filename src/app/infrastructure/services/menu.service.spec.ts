import { TestBed } from '@angular/core/testing';

import { MenuApiService } from './menu.service';
import { AppModule } from '../../../app/app.module';

describe('MenuService', () => {
  let service: MenuApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AppModule]
    });
    service = TestBed.inject(MenuApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
