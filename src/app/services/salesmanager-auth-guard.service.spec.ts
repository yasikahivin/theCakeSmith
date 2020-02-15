import { TestBed } from '@angular/core/testing';

import { SalesmanagerAuthGuardService } from './salesmanager-auth-guard.service';

describe('SalesmanagerAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesmanagerAuthGuardService = TestBed.get(SalesmanagerAuthGuardService);
    expect(service).toBeTruthy();
  });
});
