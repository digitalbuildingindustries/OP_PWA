import { TestBed, inject } from '@angular/core/testing';

import { UpdateAppService } from './update-app.service';

describe('UpdateAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateAppService]
    });
  });

  it('should be created', inject([UpdateAppService], (service: UpdateAppService) => {
    expect(service).toBeTruthy();
  }));
});
