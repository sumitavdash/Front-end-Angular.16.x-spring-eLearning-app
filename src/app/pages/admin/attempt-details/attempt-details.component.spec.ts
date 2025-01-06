import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptDetailsComponent } from './attempt-details.component';

describe('AttemptDetailsComponent', () => {
  let component: AttemptDetailsComponent;
  let fixture: ComponentFixture<AttemptDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttemptDetailsComponent]
    });
    fixture = TestBed.createComponent(AttemptDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
