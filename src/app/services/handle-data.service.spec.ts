import { TestBed, inject } from '@angular/core/testing';

import { HandleDataService } from './handle-data.service';

describe('HandleDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandleDataService]
    });
  });

  it('should be created', inject([HandleDataService], (service: HandleDataService) => {
    expect(service).toBeTruthy();
  }));
});
