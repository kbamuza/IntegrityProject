import { TestBed } from '@angular/core/testing';

import { WaterLevelService } from './water-level.service';

describe('WaterLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaterLevelService = TestBed.get(WaterLevelService);
    expect(service).toBeTruthy();
  });
});
