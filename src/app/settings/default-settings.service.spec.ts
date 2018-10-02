import { TestBed, inject } from '@angular/core/testing';

import { DefaultSettingsService } from './default-settings.service';

describe('DefaultSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultSettingsService]
    });
  });

  it('should be created', inject([DefaultSettingsService], (service: DefaultSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
