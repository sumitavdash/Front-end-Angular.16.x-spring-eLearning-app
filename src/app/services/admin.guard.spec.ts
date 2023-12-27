import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AdminGuard],
    });

    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
