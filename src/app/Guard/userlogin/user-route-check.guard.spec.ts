import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userRouteCheckGuard } from './user-route-check.guard';

describe('userRouteCheckGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userRouteCheckGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
