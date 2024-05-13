import { TestBed } from '@angular/core/testing';

import { ExpeditionSourceService } from './expedition-source.service';

describe('ExpeditionSourceService', () => {
  let service: ExpeditionSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpeditionSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
