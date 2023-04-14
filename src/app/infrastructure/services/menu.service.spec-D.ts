import { TestBed } from '@angular/core/testing';

import { MenuApiService } from './menu.service';

describe('MenuService', () => {
  let service: MenuApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
