import { TestBed, inject } from '@angular/core/testing';

import { CheckConnectionService } from './check-connection.service';

describe('CheckConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckConnectionService]
    });
  });

  it('should be created', inject([CheckConnectionService], (service: CheckConnectionService) => {
    expect(service).toBeTruthy();
  }));
});
