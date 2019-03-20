import { TestBed } from '@angular/core/testing';

import { WomanService } from './woman.service';

describe('WomanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WomanService = TestBed.get(WomanService);
    expect(service).toBeTruthy();
  });
});
