import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizQuestionsComponent } from './view-quiz-questions.component';

describe('ViewQuizQuestionsComponent', () => {
  let component: ViewQuizQuestionsComponent;
  let fixture: ComponentFixture<ViewQuizQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewQuizQuestionsComponent]
    });
    fixture = TestBed.createComponent(ViewQuizQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
