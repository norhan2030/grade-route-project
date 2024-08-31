import { TestBed } from '@angular/core/testing';

import { WhishService } from './whish.service';

describe('WhishService', () => {
  let service: WhishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
