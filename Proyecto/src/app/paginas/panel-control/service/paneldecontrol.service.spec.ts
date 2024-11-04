import { TestBed } from '@angular/core/testing';

import { PaneldecontrolService } from './paneldecontrol.service';

describe('PaneldecontrolService', () => {
  let service: PaneldecontrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaneldecontrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
