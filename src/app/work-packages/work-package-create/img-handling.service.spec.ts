import { TestBed, inject } from '@angular/core/testing';

import { ImgHandlingService } from './img-handling.service';

describe('ImgHandlingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImgHandlingService]
    });
  });

  it('should be created', inject([ImgHandlingService], (service: ImgHandlingService) => {
    expect(service).toBeTruthy();
  }));
});
