import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NormalGuard } from './normal.guard';

describe('NormalGuard', () => {
  let guard:  NormalGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [NormalGuard],
    });
    guard = TestBed.inject(NormalGuard);
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
 