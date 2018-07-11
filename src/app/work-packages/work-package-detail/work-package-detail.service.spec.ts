import { TestBed, inject } from '@angular/core/testing';

import { WorkPackageDetailService } from './work-package-detail.service';

describe('WorkPackageDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkPackageDetailService]
    });
  });

  it('should be created', inject([WorkPackageDetailService], (service: WorkPackageDetailService) => {
    expect(service).toBeTruthy();
  }));
});
