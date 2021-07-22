import { TestBed } from '@angular/core/testing';

import { ListSponsorsResolver } from './list-sponsors.resolver';

describe('ListSponsorsResolver', () => {
  let resolver: ListSponsorsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListSponsorsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
