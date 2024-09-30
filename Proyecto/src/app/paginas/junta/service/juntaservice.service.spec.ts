import { TestBed } from '@angular/core/testing';

import { JuntaService } from './juntaservice.service';

describe('JuntaserviceService', () => {
  let service: JuntaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuntaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
