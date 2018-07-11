import { TestBed, inject } from '@angular/core/testing';

import { BackgroundSyncService } from './background-sync.service';

describe('BackgroundSyncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackgroundSyncService]
    });
  });

  it('should be created', inject([BackgroundSyncService], (service: BackgroundSyncService) => {
    expect(service).toBeTruthy();
  }));
});
