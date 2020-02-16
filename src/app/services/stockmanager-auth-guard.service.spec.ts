import { TestBed } from '@angular/core/testing';

import { StockmanagerAuthGuardService } from './stockmanager-auth-guard.service';

describe('StockmanagerAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockmanagerAuthGuardService = TestBed.get(StockmanagerAuthGuardService);
    expect(service).toBeTruthy();
  });
});
