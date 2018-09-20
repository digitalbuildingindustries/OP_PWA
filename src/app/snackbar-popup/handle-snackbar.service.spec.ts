import { TestBed, inject } from '@angular/core/testing';

import { HandleSnackbarService } from './handle-snackbar.service';

describe('HandleSnackbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandleSnackbarService]
    });
  });

  it('should be created', inject([HandleSnackbarService], (service: HandleSnackbarService) => {
    expect(service).toBeTruthy();
  }));
});
