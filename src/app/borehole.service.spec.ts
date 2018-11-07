import { TestBed } from '@angular/core/testing';

import { BoreholeService } from './borehole.service';

describe('BoreholeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoreholeService = TestBed.get(BoreholeService);
    expect(service).toBeTruthy();
  });
});
