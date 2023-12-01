import { TestBed } from '@angular/core/testing';

import { OrganismGuard } from './organism.guard';

describe('OrganismGuard', () => {
  let guard: OrganismGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrganismGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
