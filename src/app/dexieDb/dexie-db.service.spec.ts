import { TestBed, inject } from '@angular/core/testing';

import { DexieDbService } from './dexie-db.service';

describe('DexieDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DexieDbService]
    });
  });

  it('should be created', inject([DexieDbService], (service: DexieDbService) => {
    expect(service).toBeTruthy();
  }));
});
