import { TestBed, inject } from '@angular/core/testing';

import { SendDataToServerService } from './send-data-to-server.service';

describe('SendDataToServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendDataToServerService]
    });
  });

  it('should be created', inject([SendDataToServerService], (service: SendDataToServerService) => {
    expect(service).toBeTruthy();
  }));
});
