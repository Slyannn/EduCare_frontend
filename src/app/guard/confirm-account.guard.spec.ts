import { TestBed } from '@angular/core/testing';

import { ConfirmAccountGuard } from './confirm-account.guard';

describe('ConfirmAccountGuard', () => {
  let guard: ConfirmAccountGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfirmAccountGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
