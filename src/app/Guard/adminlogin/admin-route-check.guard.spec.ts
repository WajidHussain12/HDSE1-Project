import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminRouteCheckGuard } from './admin-route-check.guard';

describe('adminRouteCheckGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminRouteCheckGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
