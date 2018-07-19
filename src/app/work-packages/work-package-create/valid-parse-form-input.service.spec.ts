import { TestBed, inject } from '@angular/core/testing';

import { ValidParseFormInputService } from './valid-parse-form-input.service';

describe('ValidParseFormInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidParseFormInputService]
    });
  });

  it('should be created', inject([ValidParseFormInputService], (service: ValidParseFormInputService) => {
    expect(service).toBeTruthy();
  }));
});
