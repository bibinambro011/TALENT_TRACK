import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { agentauthGuard } from './agentauth.guard';

describe('agentauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => agentauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
