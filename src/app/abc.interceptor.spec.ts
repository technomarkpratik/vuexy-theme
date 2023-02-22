import { TestBed } from '@angular/core/testing';

import { AbcInterceptor } from './abc.interceptor';

describe('AbcInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AbcInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AbcInterceptor = TestBed.inject(AbcInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
