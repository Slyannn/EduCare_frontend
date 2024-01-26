import { TestBed } from '@angular/core/testing';

import { NotLoggedInGuard } from './not-logged-in.guard';

describe('NotLoggedInGuardGuard', () => {
  let guard: NotLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
