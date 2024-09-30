import { TestBed } from '@angular/core/testing';

import { CrearService } from './crear.service';

describe('CrearService', () => {
  let service: CrearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
