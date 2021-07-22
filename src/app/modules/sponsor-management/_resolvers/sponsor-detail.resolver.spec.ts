import { TestBed } from '@angular/core/testing';

import { SponsorDetailResolver } from './sponsor-detail.resolver';

describe('SponsorDetailResolver', () => {
  let resolver: SponsorDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SponsorDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
