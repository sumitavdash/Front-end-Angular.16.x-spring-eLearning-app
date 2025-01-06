import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakesUsDifferentComponent } from './makes-us-different.component';

describe('MakesUsDifferentComponent', () => {
  let component: MakesUsDifferentComponent;
  let fixture: ComponentFixture<MakesUsDifferentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakesUsDifferentComponent]
    });
    fixture = TestBed.createComponent(MakesUsDifferentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
